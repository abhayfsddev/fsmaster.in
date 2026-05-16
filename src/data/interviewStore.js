/**
 * Static interview data — bundled at build time (no fetch / HTTP).
 */
import meta from './generated/index.json';
import categories from './generated/categories.json';
import searchIndex from './generated/search-index.json';
import { questions } from './questions.js';

const pageModules = import.meta.glob('./generated/page-*.json', { eager: true });

const pages = Object.entries(pageModules)
  .map(([path, mod]) => {
    const num = parseInt(path.match(/page-(\d+)\.json/)?.[1] || '0', 10);
    return { num, items: mod.default || mod };
  })
  .sort((a, b) => a.num - b.num)
  .map((p) => p.items);

const allQuestions = pages.flat();

const byId = new Map(allQuestions.map((q) => [q.id, q]));

export const interviewMeta = meta;
export const interviewCategories = categories;
export const interviewSearchIndex = searchIndex;
export { questions };

export function slug(value = '') {
  return String(value).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function getQuestionById(id) {
  return byId.get(Number(id)) || null;
}

export function getCategoryById(topicId) {
  return categories.find((c) => c.id === topicId) || null;
}

export function filterQuestions({ categoryId, subCategory, search = '' }) {
  const q = search.trim().toLowerCase();
  return allQuestions.filter((item) => {
    const catMatch =
      !categoryId ||
      slug(item.category) === categoryId ||
      slug(item.category) === slug(categoryId);
    const subMatch =
      !subCategory ||
      slug(item.subCategory) === slug(subCategory) ||
      item.subCategory.toLowerCase() === subCategory.toLowerCase();
    if (!catMatch || !subMatch) return false;
    if (!q) return true;
    return (
      item.question.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.subCategory.toLowerCase().includes(q) ||
      interviewSearchIndex
        .find((s) => s.id === item.id)
        ?.keywords?.some((k) => k.includes(q))
    );
  });
}

export function paginate(items, page, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: items.length,
  };
}
