export const questionExplanations = {
  1: {
    explanation: `Finding the 2nd highest salary in SQL is a common interview question that tests your understanding of SQL subqueries, ordering, and limiting results. The most straightforward approach is to use a subquery with ORDER BY and LIMIT/OFFSET or TOP clauses depending on the database. Another approach uses the DISTINCT keyword to handle duplicate salaries. The concept involves sorting salaries in descending order and then selecting the second distinct value. This problem tests your ability to think about edge cases like duplicate salaries, null values, and empty result sets. In real-world scenarios, you might need to find the Nth highest value, which requires a more generalized approach using window functions like DENSE_RANK() or ROW_NUMBER(). Understanding these different approaches demonstrates your SQL proficiency and problem-solving skills.`,
    code: `-- Method 1: Using LIMIT and OFFSET (MySQL, PostgreSQL)
SELECT DISTINCT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET 1;

-- Method 2: Using TOP (SQL Server)
SELECT TOP 1 salary 
FROM (
  SELECT DISTINCT TOP 2 salary 
  FROM employees 
  ORDER BY salary DESC
) AS temp
ORDER BY salary ASC;

-- Method 3: Using subquery
SELECT MAX(salary) 
FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 4: Using DENSE_RANK (Modern SQL)
WITH RankedSalaries AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
  FROM employees
)
SELECT salary FROM RankedSalaries WHERE rank = 2 LIMIT 1;`,
    table: null
  },
  2: {
    explanation: `Finding the longest consecutive sequence in an unsorted array in O(n) time is a classic algorithmic problem that tests your understanding of hash sets and efficient data structures. The brute force approach would be O(n²) by checking each element and expanding in both directions, but we can achieve O(n) using a HashSet. The key insight is that we only need to start counting sequences from the smallest element of each consecutive sequence. By storing all elements in a HashSet for O(1) lookups, we can efficiently check if an element is the start of a sequence (i.e., num-1 is not in the set). This approach ensures each element is visited at most twice, giving us linear time complexity. This problem is important for understanding how to optimize algorithms and choose appropriate data structures for specific constraints.`,
    code: `// Java 8 Solution using Stream
import java.util.*;
import java.util.stream.*;

public class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        
        Set<Integer> numSet = Arrays.stream(nums)
            .boxed()
            .collect(Collectors.toSet());
        
        int longest = 0;
        
        for (int num : numSet) {
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                
                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                
                longest = Math.max(longest, currentStreak);
            }
        }
        
        return longest;
    }
}

// Without Java 8 Solution
import java.util.*;

public class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        
        int longest = 0;
        
        for (int num : numSet) {
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                
                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                
                longest = Math.max(longest, currentStreak);
            }
        }
        
        return longest;
    }
}`,
    table: null
  },
  3: {
    explanation: `ACID properties are fundamental concepts in database management that ensure reliable transaction processing. ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity ensures that a transaction is treated as a single unit - either all operations succeed or none do, preventing partial updates that could leave the database in an inconsistent state. Consistency ensures that a transaction brings the database from one valid state to another valid state, maintaining all database rules and constraints. Isolation ensures that concurrent transactions don't interfere with each other, with different isolation levels providing varying degrees of separation. Durability guarantees that once a transaction is committed, it remains permanent even in the event of system failures. Understanding ACID is crucial for designing reliable database systems and choosing appropriate isolation levels for different use cases.`,
    code: null,
    table: null
  },
  4: {
    explanation: `Choosing between SQL and NoSQL databases is a critical architectural decision that depends on your specific requirements. SQL databases are relational, use structured schemas, support complex queries with JOINs, ensure ACID compliance, and are ideal for structured data with clear relationships. They're best for financial systems, e-commerce platforms, and applications requiring complex transactions. NoSQL databases are non-relational, offer flexible schemas, handle unstructured/semi-structured data well, provide horizontal scalability, and often sacrifice ACID for performance (BASE model). They're ideal for big data, real-time applications, content management, and rapidly evolving data models. Key factors to consider include data structure, scalability needs, consistency requirements, query complexity, and development speed. Many modern applications use a polyglot persistence approach, combining both SQL and NoSQL databases to leverage their respective strengths.`,
    code: null,
    table: `| Aspect | SQL (Relational) | NoSQL (Non-Relational) |
|--------|-----------------|----------------------|
| Schema | Fixed, predefined | Flexible, dynamic |
| Scalability | Vertical scaling | Horizontal scaling |
| Consistency | Strong (ACID) | Eventual (BASE) |
| Query Language | SQL | Various (JSON, BSON, etc.) |
| Relationships | JOINs supported | Embedded documents |
| Examples | MySQL, PostgreSQL | MongoDB, Cassandra |
| Use Case | Financial systems | Big data, real-time apps |
| Transactions | Complex transactions | Simple transactions |
| Data Structure | Tables with rows/columns | Documents, key-value, graphs |`
  },
  5: {
    explanation: `Finding the 2nd highest salary using Java 8 Streams demonstrates the power of functional programming in Java. The Stream API provides a declarative way to process collections, making code more readable and concise. The approach involves converting the collection to a stream, applying intermediate operations like distinct() to remove duplicates, sorted() with Comparator.reverseOrder() to sort in descending order, and skip(1) to skip the first element, then limit(1) to get the second element. This functional approach is more expressive than traditional imperative loops and can be easily parallelized for better performance on large datasets. Understanding Java 8 Streams is essential for modern Java development as it enables cleaner code, better readability, and potential performance improvements through parallel processing.`,
    code: `// Java 8 Stream Solution
import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> salaries = Arrays.asList(50000, 60000, 55000, 70000, 65000);
        
        Optional<Integer> secondHighest = salaries.stream()
            .distinct()
            .sorted(Comparator.reverseOrder())
            .skip(1)
            .findFirst();
        
        secondHighest.ifPresent(s -> System.out.println("2nd Highest: " + s));
    }
}

// Without Java 8 Solution
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> salaries = Arrays.asList(50000, 60000, 55000, 70000, 65000);
        
        Set<Integer> uniqueSalaries = new HashSet<>(salaries);
        List<Integer> sortedSalaries = new ArrayList<>(uniqueSalaries);
        Collections.sort(sortedSalaries, Collections.reverseOrder());
        
        if (sortedSalaries.size() >= 2) {
            System.out.println("2nd Highest: " + sortedSalaries.get(1));
        }
    }
}

// Alternative without Java 8 (manual sorting)
import java.util.*;

public class Solution {
    public static int findSecondHighest(int[] arr) {
        if (arr.length < 2) return -1;
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        
        return second == Integer.MIN_VALUE ? -1 : second;
    }
}`,
    table: null
  },
  6: {
    explanation: `Getting employee salary department-wise is a common SQL aggregation task that demonstrates understanding of GROUP BY clauses, aggregate functions, and joining tables. The query typically involves joining employee and department tables, grouping by department name or ID, and using aggregate functions like SUM, AVG, MAX, or MIN on salary columns. This type of query is essential for reporting and analytics in HR systems, helping organizations understand salary distribution across departments. Advanced variations might include filtering with HAVING clause, calculating salary ranges, or ranking employees within departments. Understanding GROUP BY is fundamental for data analysis and reporting in SQL, as it allows you to summarize data across different dimensions and derive meaningful insights from large datasets.`,
    code: `-- Query 1: Total salary by department
SELECT d.department_name, SUM(e.salary) as total_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY total_salary DESC;

-- Query 2: Average salary by department
SELECT d.department_name, 
       AVG(e.salary) as avg_salary,
       COUNT(e.employee_id) as employee_count
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY avg_salary DESC;

-- Query 3: Salary statistics by department
SELECT d.department_name,
       MIN(e.salary) as min_salary,
       MAX(e.salary) as max_salary,
       AVG(e.salary) as avg_salary,
       SUM(e.salary) as total_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY total_salary DESC;

-- Query 4: Department with salary > 50000 average
SELECT d.department_name, AVG(e.salary) as avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING AVG(e.salary) > 50000
ORDER BY avg_salary DESC;

-- Query 5: Salary distribution with percentiles
SELECT d.department_name,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY e.salary) as median_salary,
       PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY e.salary) as percentile_75
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name;`,
    table: null
  },
  7: {
    explanation: `JOIN FETCH is a Hibernate-specific feature used to optimize lazy loading by fetching associated entities in the same query. When you have a one-to-many or many-to-one relationship, Hibernate by default uses lazy loading, meaning associated entities are loaded only when accessed. This can lead to the N+1 query problem where one query fetches the parent entities and N additional queries fetch the children. JOIN FETCH solves this by using a SQL JOIN to fetch both parent and child entities in a single query, significantly improving performance. It's particularly useful when you know you'll need the associated data immediately. However, overusing JOIN FETCH can lead to Cartesian products with multiple collections, so it should be used judiciously. Understanding JOIN FETCH is essential for optimizing Hibernate performance and avoiding common pitfalls like the N+1 query problem.`,
    code: null,
    table: null
  },
  8: {
    explanation: `The N+1 query problem is a common performance issue in ORM frameworks like Hibernate where executing one query to fetch N parent entities results in N additional queries to fetch their associated child entities. For example, fetching 100 users might result in 101 queries (1 for users + 100 for their addresses). This happens due to lazy loading where associations are loaded on demand. Solutions include: 1) Using JOIN FETCH to load associations in the same query, 2) Using @BatchSize to batch fetch multiple associations, 3) Using entity graphs to define fetch plans, 4) Using second-level caching, 5) Using DTO projections to fetch only needed data. Understanding and preventing the N+1 problem is crucial for maintaining good application performance, especially in systems with many entities and complex relationships. Proper fetching strategies can reduce database load and improve response times significantly.`,
    code: `// Hibernate Solution using JOIN FETCH
@Entity
public class User {
    @Id
    private Long id;
    private String name;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private List<Address> addresses;
}

// Query with JOIN FETCH
String hql = "SELECT u FROM User u JOIN FETCH u.addresses WHERE u.id = :id";
Query query = session.createQuery(hql);
query.setParameter("id", userId);
User user = (User) query.uniqueResult();

// Using @BatchSize
@Entity
public class User {
    @OneToMany(fetch = FetchType.LAZY)
    @BatchSize(size = 50)
    @JoinColumn(name = "user_id")
    private List<Address> addresses;
}

// Using EntityGraph
EntityGraph<User> graph = em.createEntityGraph(User.class);
graph.addAttributeNodes("addresses");

Map<String, Object> hints = new HashMap<>();
hints.put("javax.persistence.fetchgraph", graph);

User user = em.find(User.class, userId, hints);

// Using Criteria API with JOIN FETCH
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> cq = cb.createQuery(User.class);
Root<User> root = cq.from(User.class);
root.fetch("addresses", JoinType.INNER);
cq.where(cb.equal(root.get("id"), userId));
User user = session.createQuery(cq).uniqueResult();`,
    table: null
  },
  9: {
    explanation: `Functions and Procedures in SQL are both stored program units, but they serve different purposes and have different characteristics. A Function is a subroutine that returns a single value and can be used in SQL statements like SELECT, WHERE, and HAVING clauses. Functions must return a value and cannot modify database state (no INSERT, UPDATE, DELETE). A Procedure is a subroutine that performs actions and can return multiple values through OUT parameters. Procedures can modify database state and are called using CALL or EXECUTE statements. Functions are typically used for calculations and data transformations, while procedures are used for complex business logic and data manipulation. Understanding the difference is important for designing efficient database applications and choosing the right tool for specific tasks.`,
    code: `-- Function Example
CREATE FUNCTION get_employee_salary(emp_id INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE salary DECIMAL(10,2);
    SELECT salary INTO salary FROM employees WHERE employee_id = emp_id;
    RETURN salary;
END;

-- Using Function in SELECT
SELECT employee_name, get_employee_salary(employee_id) as salary
FROM employees;

-- Procedure Example
CREATE PROCEDURE update_employee_salary(
    IN emp_id INT,
    IN new_salary DECIMAL(10,2),
    OUT old_salary DECIMAL(10,2)
)
BEGIN
    SELECT salary INTO old_salary FROM employees WHERE employee_id = emp_id;
    UPDATE employees SET salary = new_salary WHERE employee_id = emp_id;
END;

-- Calling Procedure
CALL update_employee_salary(1001, 75000.00, @old_salary);
SELECT @old_salary as previous_salary;

-- Procedure with multiple OUT parameters
CREATE PROCEDURE get_department_stats(
    IN dept_id INT,
    OUT avg_salary DECIMAL(10,2),
    OUT emp_count INT,
    OUT total_salary DECIMAL(10,2)
)
BEGIN
    SELECT AVG(salary), COUNT(*), SUM(salary)
    INTO avg_salary, emp_count, total_salary
    FROM employees WHERE department_id = dept_id;
END;`,
    table: `| Feature | Function | Procedure |
|---------|----------|-----------|
| Return Value | Single value | Multiple values (OUT params) |
| Usage in SELECT | Can be used | Cannot be used |
| Database Modification | Not allowed | Allowed |
| Transaction Control | Limited | Full control |
| Parameters | IN only | IN, OUT, INOUT |
| Return Type | Must specify | No return type |
| Use Case | Calculations | Business logic |
| Example | get_total() | process_order() |`
  },
  10: {
    explanation: `Hibernate and JPA (Java Persistence API) are often confused but serve different roles in Java persistence. JPA is a specification that defines a standard interface for object-relational mapping in Java, providing annotations like @Entity, @OneToMany, and EntityManager. Hibernate is a specific implementation of the JPA specification, along with other implementations like EclipseLink and OpenJPA. While JPA defines the standard, Hibernate provides additional features beyond the specification, such as caching, enhanced query capabilities, and better performance optimizations. When using Hibernate as a JPA provider, you get the benefits of standard JPA portability while leveraging Hibernate's advanced features. Understanding this distinction is important for making informed decisions about persistence frameworks and ensuring your code remains portable across different JPA implementations.`,
    code: null,
    table: `| Aspect | JPA | Hibernate |
|--------|-----|-----------|
| Type | Specification | Implementation |
| Portability | High | Limited to Hibernate |
| Features | Standard only | Standard + Extended |
| Query Language | JPQL | HQL + JPQL |
| Caching | Basic | Advanced (L1, L2, Query) |
| Performance | Standard | Optimized |
| Learning Curve | Moderate | Steeper |
| Community | Standard | Large, active |
| Use Case | Standard apps | Complex apps |`
  },
  11: {
    explanation: `In Hibernate, methods like findByName() or findByNameAndSalary() will work if you're using Spring Data JPA's query derivation mechanism. Spring Data JPA can automatically generate query implementations based on method names following specific naming conventions. For findByName(), it generates a query that finds entities by the name field. For findByNameAndSalary(), it generates a query with AND conditions for both fields. This works as long as the entity has corresponding fields with those names. The method name must start with find, read, query, count, or get, followed by the field names. You can also add keywords like And, Or, Between, LessThan, GreaterThan, Like, etc., to build complex queries. This feature reduces boilerplate code and makes repository interfaces more declarative and readable.`,
    code: null,
    table: null
  },
  12: {
    explanation: `Connecting Spring Boot with a database is straightforward thanks to Spring Boot's auto-configuration and starter dependencies. The process involves adding the appropriate database driver dependency (like MySQL, PostgreSQL, H2), configuring database connection properties in application.properties or application.yml, and using Spring Data JPA repositories for data access. Spring Boot automatically configures the DataSource, EntityManagerFactory, and TransactionManager based on the dependencies and configuration. You can use H2 for in-memory databases during development and switch to production databases like MySQL or PostgreSQL with minimal configuration changes. Spring Boot also supports connection pooling via HikariCP (default) or other pooling libraries. Understanding database configuration in Spring Boot is essential for building data-driven applications and managing database connections efficiently.`,
    code: `// application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.maximum-pool-size=5

// Entity
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "salary")
    private BigDecimal salary;
    
    // getters and setters
}

// Repository
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findBySalaryGreaterThan(BigDecimal salary);
    Optional<Employee> findByName(String name);
}

// Service
@Service
@Transactional
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    public List<Employee> getHighPaidEmployees(BigDecimal threshold) {
        return employeeRepository.findBySalaryGreaterThan(threshold);
    }
}

// Controller
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee saved = employeeService.saveEmployee(employee);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/high-salary")
    public ResponseEntity<List<Employee>> getHighPaidEmployees(
            @RequestParam BigDecimal threshold) {
        return ResponseEntity.ok(employeeService.getHighPaidEmployees(threshold));
    }
}`,
    table: null
  },
  13: {
    explanation: `The Criteria API in JPA provides a programmatic way to build type-safe queries without writing JPQL strings. It's particularly useful when you need to build dynamic queries based on user input or complex conditions. The Criteria API uses a set of Java classes to construct queries programmatically, allowing you to build queries step by step with compile-time checking. This eliminates the risk of SQL injection and makes refactoring easier since field names are checked at compile time. The API includes CriteriaBuilder for creating criteria queries, CriteriaQuery for defining the query structure, Root for specifying the entity type, and various expression methods for building conditions. While more verbose than JPQL, the Criteria API offers better type safety and is ideal for complex, dynamic query scenarios.`,
    code: `// Criteria API Example
@Repository
public class EmployeeRepositoryImpl {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<Employee> findEmployeesByCriteria(String name, BigDecimal minSalary) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> query = cb.createQuery(Employee.class);
        Root<Employee> employee = query.from(Employee.class);
        
        List<Predicate> predicates = new ArrayList<>();
        
        if (name != null && !name.isEmpty()) {
            predicates.add(cb.like(
                cb.lower(employee.get("name")), 
                "%" + name.toLowerCase() + "%"
            ));
        }
        
        if (minSalary != null) {
            predicates.add(cb.greaterThanOrEqualTo(
                employee.get("salary"), 
                minSalary
            ));
        }
        
        query.where(predicates.toArray(new Predicate[0]));
        
        return entityManager.createQuery(query).getResultList();
    }
    
    public List<Employee> findEmployeesWithJoinFetch() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> query = cb.createQuery(Employee.class);
        Root<Employee> employee = query.from(Employee.class);
        
        employee.fetch("department", JoinType.INNER);
        
        return entityManager.createQuery(query).getResultList();
    }
    
    public Long countEmployeesByDepartment(Long departmentId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<Employee> employee = query.from(Employee.class);
        
        query.select(cb.count(employee))
             .where(cb.equal(employee.get("department").get("id"), departmentId));
        
        return entityManager.createQuery(query).getSingleResult();
    }
}`,
    table: null
  },
  14: {
    explanation: `Writing native SQL queries in JPA is sometimes necessary when you need to use database-specific features, optimize performance, or execute complex queries that are difficult to express in JPQL. JPA provides the @NamedNativeQuery annotation for defining native queries at the entity level, and the createNativeQuery() method in EntityManager for dynamic native queries. Native queries can return entities, scalar values, or custom result sets using @SqlResultSetMapping. While native queries offer flexibility and performance benefits, they lose database portability and type safety. It's important to use native queries judiciously and prefer JPQL or Criteria API when possible. When using native queries, be aware of SQL injection risks and use parameter binding instead of string concatenation.`,
    code: `// Using @NamedNativeQuery
@Entity
@NamedNativeQuery(
    name = "Employee.findHighSalary",
    query = "SELECT * FROM employees WHERE salary > ?1",
    resultClass = Employee.class
)
public class Employee {
    @Id
    private Long id;
    private String name;
    private BigDecimal salary;
}

// Using EntityManager.createNativeQuery()
@Repository
public class EmployeeRepository {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<Employee> findHighSalaryEmployees(BigDecimal threshold) {
        String sql = "SELECT * FROM employees WHERE salary > :threshold";
        Query query = entityManager.createNativeQuery(sql, Employee.class);
        query.setParameter("threshold", threshold);
        return query.getResultList();
    }
    
    public List<Object[]> getEmployeeStatistics() {
        String sql = "SELECT department_id, COUNT(*), AVG(salary) " +
                    "FROM employees GROUP BY department_id";
        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList();
    }
    
    // Using @SqlResultSetMapping for custom results
    @SqlResultSetMapping(
        name = "EmployeeStatsMapping",
        classes = {
            @ConstructorResult(
                targetClass = EmployeeStats.class,
                columns = {
                    @ColumnResult(name = "dept_id", type = Long.class),
                    @ColumnResult(name = "emp_count", type = Long.class),
                    @ColumnResult(name = "avg_salary", type = BigDecimal.class)
                }
            )
        }
    )
    
    public List<EmployeeStats> getEmployeeStatsWithMapping() {
        String sql = "SELECT department_id as dept_id, " +
                    "COUNT(*) as emp_count, AVG(salary) as avg_salary " +
                    "FROM employees GROUP BY department_id";
        
        Query query = entityManager.createNativeQuery(sql, "EmployeeStatsMapping");
        return query.getResultList();
    }
}`,
    table: null
  },
  15: {
    explanation: `Connecting to multiple databases in a single Spring Boot service is a common requirement for applications that need to access data from different data sources, such as legacy databases, reporting databases, or microservices architectures. Spring Boot supports multiple DataSources through configuration classes that define separate DataSource beans, EntityManagerFactory beans, and TransactionManager beans for each database. Each repository needs to be associated with a specific EntityManager using the @EnableJpaRepositories annotation. This approach allows you to partition your repositories by database and manage transactions separately for each data source. Key considerations include transaction management across multiple databases, connection pooling configuration, and ensuring proper isolation between different data sources. Understanding multi-database configuration is essential for complex enterprise applications.`,
    code: `// Primary Database Configuration
@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.repository.primary",
    entityManagerFactoryRef = "primaryEntityManagerFactory",
    transactionManagerRef = "primaryTransactionManager"
)
public class PrimaryDbConfig {
    
    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Primary
    @Bean
    public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(
            DataSource primaryDataSource) {
        
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(primaryDataSource);
        em.setPackagesToScan("com.example.entity.primary");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        return em;
    }
    
    @Primary
    @Bean
    public PlatformTransactionManager primaryTransactionManager(
            EntityManagerFactory primaryEntityManagerFactory) {
        return new JpaTransactionManager(primaryEntityManagerFactory);
    }
}

// Secondary Database Configuration
@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.repository.secondary",
    entityManagerFactoryRef = "secondaryEntityManagerFactory",
    transactionManagerRef = "secondaryTransactionManager"
)
public class SecondaryDbConfig {
    
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(
            DataSource secondaryDataSource) {
        
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secondaryDataSource);
        em.setPackagesToScan("com.example.entity.secondary");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        return em;
    }
    
    @Bean
    public PlatformTransactionManager secondaryTransactionManager(
            EntityManagerFactory secondaryEntityManagerFactory) {
        return new JpaTransactionManager(secondaryEntityManagerFactory);
    }
}

// application.properties
spring.datasource.primary.url=jdbc:mysql://localhost:3306/primary_db
spring.datasource.primary.username=root
spring.datasource.primary.password=password

spring.datasource.secondary.url=jdbc:postgresql://localhost:5432/secondary_db
spring.datasource.secondary.username=postgres
spring.datasource.secondary.password=password`,
    table: null
  },
  16: {
    explanation: `The isolation property in @Transactional annotation controls the transaction isolation level, which determines how transactions interact with each other when accessing the same data. Isolation levels include READ_UNCOMMITTED (lowest isolation, allows dirty reads), READ_COMMITTED (prevents dirty reads), REPEATABLE_READ (prevents dirty and non-repeatable reads), and SERIALIZABLE (highest isolation, prevents all concurrency issues). The default isolation level depends on the database. Choosing the right isolation level is crucial for balancing data consistency and performance. Higher isolation levels provide stronger consistency guarantees but can lead to more locking and reduced concurrency. Lower isolation levels improve performance but may allow inconsistent reads. Understanding isolation levels is essential for designing transactional systems that maintain data integrity while maintaining acceptable performance.`,
    code: null,
    table: null
  },
  17: {
    explanation: `A deadlock in databases occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency that prevents any of them from proceeding. For example, Transaction A holds a lock on Table X and needs a lock on Table Y, while Transaction B holds a lock on Table Y and needs a lock on Table X. Neither can proceed, resulting in a deadlock. Deadlocks typically occur due to inconsistent ordering of resource access, long-running transactions, or lack of proper indexing. Database systems detect deadlocks and automatically kill one transaction to resolve the deadlock. To prevent deadlocks, ensure consistent ordering of resource access, keep transactions short, use appropriate isolation levels, and implement proper retry logic. Understanding deadlocks is crucial for designing robust database applications and handling concurrency issues effectively.`,
    code: null,
    table: null
  },
  18: {
    explanation: `Automatically storing insert or update timestamps according to database time is a common requirement for auditing and tracking data modifications. Most databases provide built-in features for this: MySQL uses DEFAULT CURRENT_TIMESTAMP and ON UPDATE CURRENT_TIMESTAMP, PostgreSQL uses DEFAULT NOW() and triggers, Oracle uses DEFAULT SYSDATE and triggers, and SQL Server uses DEFAULT GETDATE() and triggers. In JPA/Hibernate, you can use @CreationTimestamp and @UpdateTimestamp annotations, or @PrePersist and @PreUpdate lifecycle callbacks. Using database-level timestamps ensures consistency even when data is modified outside the application. This approach is essential for audit trails, data synchronization, and tracking record lifecycles. Understanding timestamp management is important for building applications that require accurate time tracking and audit capabilities.`,
    code: `-- MySQL Solution
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PostgreSQL Solution with Trigger
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_employees_updated_at 
    BEFORE UPDATE ON employees 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- JPA/Hibernate Solution
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Alternative using @PrePersist and @PreUpdate
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}`,
    table: `| Database | Insert Timestamp | Update Timestamp | Trigger Required |
|----------|-----------------|-----------------|------------------|
| MySQL | DEFAULT CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | No |
| PostgreSQL | DEFAULT NOW() | Trigger | Yes |
| Oracle | DEFAULT SYSDATE | Trigger | Yes |
| SQL Server | DEFAULT GETDATE() | Trigger | Yes |
| JPA | @CreationTimestamp | @UpdateTimestamp | No |`
  },
  19: {
    explanation: `Finding the 2nd highest number from an array without using predefined functions is a fundamental algorithmic problem that tests your understanding of array traversal and comparison logic. The approach involves iterating through the array once while maintaining two variables: the highest and second highest numbers. For each element, we compare it with the current highest and second highest values, updating them accordingly. This algorithm runs in O(n) time complexity with O(1) space complexity, making it efficient for large arrays. Edge cases to consider include arrays with fewer than 2 elements, duplicate values, and negative numbers. This problem is often asked in interviews to assess basic programming skills and algorithmic thinking without relying on built-in sorting or max functions.`,
    code: `// Java 8 Solution using Stream
import java.util.*;
import java.util.stream.*;

public class Solution {
    public static int findSecondHighest(int[] arr) {
        if (arr.length < 2) return -1;
        
        return Arrays.stream(arr)
            .distinct()
            .boxed()
            .sorted(Comparator.reverseOrder())
            .skip(1)
            .findFirst()
            .orElse(-1);
    }
}

// Without Java 8 Solution
public class Solution {
    public static int findSecondHighest(int[] arr) {
        if (arr.length < 2) return -1;
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > first) {
                second = first;
                first = arr[i];
            } else if (arr[i] > second && arr[i] != first) {
                second = arr[i];
            }
        }
        
        return second == Integer.MIN_VALUE ? -1 : second;
    }
    
    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 1};
        System.out.println("Second Highest: " + findSecondHighest(arr));
    }
}

// Alternative without Java 8 (handling duplicates)
public class Solution {
    public static int findSecondHighest(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int max1 = arr[0];
        int max2 = Integer.MIN_VALUE;
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max1) {
                max2 = max1;
                max1 = arr[i];
            } else if (arr[i] > max2 && arr[i] != max1) {
                max2 = arr[i];
            }
        }
        
        if (max2 == Integer.MIN_VALUE) {
            throw new RuntimeException("No second highest element found");
        }
        
        return max2;
    }
}`,
    table: null
  },
  20: {
    explanation: `Locking in databases is a mechanism to manage concurrent access to data, ensuring data integrity and consistency when multiple transactions try to access the same data simultaneously. Database locks can be categorized into several types: shared locks (for read operations, allowing multiple readers), exclusive locks (for write operations, preventing other transactions from accessing), intent locks (for hierarchical locking), and row-level vs table-level locks. Locks can be optimistic (no locking during read, check for conflicts on write) or pessimistic (locking during read to prevent conflicts). Understanding locking is crucial for designing high-concurrency applications, preventing deadlocks, and choosing appropriate isolation levels. Proper lock management ensures data consistency while maintaining acceptable performance in multi-user environments.`,
    code: null,
    table: null
  },
  21: {
    explanation: `Common database operation problems in production include slow queries due to missing indexes, deadlocks caused by long-running transactions, connection pool exhaustion, data inconsistency due to improper transaction management, and performance degradation from large table scans. Other issues include N+1 query problems in ORM frameworks, lock contention, insufficient connection pooling, and inadequate monitoring. Solutions involve proper indexing, query optimization, appropriate isolation levels, connection pool tuning, implementing caching strategies, and comprehensive monitoring. Understanding these common issues and their solutions is essential for maintaining database performance and reliability in production environments. Proactive monitoring and performance tuning can prevent many of these issues from becoming critical problems.`,
    code: null,
    table: null
  },
  22: {
    explanation: `Finding employees whose salary is less than 50k department-wise is a SQL aggregation task that combines filtering with grouping. This query demonstrates the use of WHERE clauses for filtering, GROUP BY for aggregation, and aggregate functions like COUNT, SUM, AVG for department-wise statistics. The query typically joins employee and department tables, filters by salary condition, groups by department, and calculates relevant metrics. This type of query is essential for HR analytics, salary distribution analysis, and departmental reporting. Advanced variations might include HAVING clauses for post-aggregation filtering, ranking employees within departments, or calculating salary percentiles. Understanding GROUP BY with filtering is fundamental for data analysis and reporting in SQL.`,
    code: `-- Query 1: Count employees with salary < 50k by department
SELECT d.department_name, 
       COUNT(e.employee_id) as employee_count,
       AVG(e.salary) as avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary < 50000
GROUP BY d.department_name
ORDER BY employee_count DESC;

-- Query 2: List employees with salary < 50k by department
SELECT d.department_name, 
       e.employee_name, 
       e.salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary < 50000
ORDER BY d.department_name, e.salary DESC;

-- Query 3: Department-wise salary distribution for < 50k
SELECT d.department_name,
       COUNT(CASE WHEN e.salary < 30000 THEN 1 END) as low_salary,
       COUNT(CASE WHEN e.salary >= 30000 AND e.salary < 40000 THEN 1 END) as mid_salary,
       COUNT(CASE WHEN e.salary >= 40000 AND e.salary < 50000 THEN 1 END) as high_salary,
       COUNT(*) as total_under_50k
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary < 50000
GROUP BY d.department_name;

-- Query 4: Using HAVING to filter departments
SELECT d.department_name,
       COUNT(e.employee_id) as under_50k_count,
       AVG(e.salary) as avg_under_50k
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary < 50000
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY under_50k_count DESC;

-- Query 5: With percentage calculation
SELECT d.department_name,
       COUNT(e.employee_id) as under_50k_count,
       (COUNT(e.employee_id) * 100.0 / total.total_count) as percentage,
       AVG(e.salary) as avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
CROSS JOIN (SELECT COUNT(*) as total_count FROM employees WHERE salary < 50000) total
WHERE e.salary < 50000
GROUP BY d.department_name, total.total_count
ORDER BY percentage DESC;`,
    table: `| employee_id | employee_name | department_id | salary |
|-------------|---------------|---------------|---------|
| 1001 | John Doe | 1 | 45000 |
| 1002 | Jane Smith | 1 | 42000 |
| 1003 | Bob Johnson | 2 | 38000 |
| 1004 | Alice Brown | 2 | 35000 |
| 1005 | Charlie Davis | 3 | 48000 |

| department_id | department_name |
|---------------|-----------------|
| 1 | Engineering |
| 2 | Marketing |
| 3 | Sales |`
  },
  23: {
    explanation: `Managing history tables in a distributed e-commerce system is crucial for audit trails, data recovery, and compliance requirements. In a distributed environment, maintaining consistent history across multiple services requires careful design. Approaches include: 1) Event sourcing where all state changes are stored as immutable events, 2) Change Data Capture (CDC) to track database changes, 3) Application-level history tables with triggers or application logic, 4) Using temporal tables in databases that support them, 5) Implementing the Outbox pattern for reliable event publishing. Key considerations include eventual consistency, handling schema evolution, managing storage costs, and ensuring data integrity across services. History tables enable rollback capabilities, audit compliance, and analytics on historical data. Understanding these patterns is essential for building robust distributed systems that require comprehensive data tracking.`,
    code: null,
    table: null
  },
  24: {
    explanation: `Database features for auditing tables include triggers, temporal tables, Change Data Capture (CDC), and application-level logging. Triggers can automatically insert records into audit tables when data changes occur, capturing old and new values, user information, and timestamps. Temporal tables (available in SQL Server, PostgreSQL, and Oracle) automatically maintain historical versions of data with system-versioning. CDC tracks row-level changes and makes them available for consumption. Application-level logging provides more control but requires explicit implementation. Choosing the right approach depends on database capabilities, performance requirements, and audit granularity needs. Proper auditing is essential for compliance, security monitoring, and data recovery in enterprise applications.`,
    code: null,
    table: null
  },
  25: {
    explanation: `Database indexes work internally as data structures that improve query performance by enabling faster data retrieval. Most commonly, indexes use B-Tree (Balanced Tree) structures, which maintain sorted data and allow logarithmic time complexity for searches, insertions, and deletions. When you create an index on a column, the database builds a separate data structure containing the indexed column values and pointers to the actual table rows. B-Trees keep data balanced, ensuring consistent performance regardless of data distribution. Other index types include Hash indexes (for equality comparisons), Bitmap indexes (for low-cardinality columns), and Full-text indexes (for text search). Understanding how indexes work internally helps in designing effective indexing strategies, choosing appropriate index types, and avoiding performance pitfalls like over-indexing or inappropriate index selection.`,
    code: null,
    table: null
  },
  26: {
    explanation: `Hash collision occurs in hash-based data structures when two different keys produce the same hash value. In Java's HashMap, when collisions happen, the implementation uses separate chaining (linked lists) to store multiple entries at the same bucket position. Starting from Java 8, when a bucket's linked list size exceeds a threshold (TREEIFY_THRESHOLD = 8), it converts to a balanced tree (red-black tree) to improve lookup performance from O(n) to O(log n). Hash collisions degrade performance, so good hash functions are crucial to distribute keys evenly. Understanding hash collisions is important for implementing custom hash functions, choosing appropriate collection types, and optimizing performance in scenarios with many collisions. The balanced tree optimization in HashMap demonstrates how modern implementations handle edge cases to maintain performance.`,
    code: null,
    table: null
  },
  27: {
    explanation: `When a query takes too much time in production, systematic troubleshooting is essential. Steps include: 1) Analyze the execution plan to identify bottlenecks, 2) Check for missing indexes and add appropriate ones, 3) Review query structure for optimization opportunities, 4) Examine statistics and update if outdated, 5) Consider partitioning large tables, 6) Implement caching for frequently accessed data, 7) Review database configuration and resource allocation, 8) Check for locking issues and long-running transactions, 9) Consider query rewriting or denormalization, 10) Use database monitoring tools to identify patterns. Understanding query optimization techniques and having a systematic approach to performance tuning is crucial for maintaining database performance in production environments.`,
    code: null,
    table: null
  },
  28: {
    explanation: `Data integrity in database context refers to the accuracy, consistency, and reliability of data stored in a database. It ensures that data remains valid and consistent throughout its lifecycle. Data integrity is enforced through constraints: NOT NULL (no null values), UNIQUE (no duplicate values), PRIMARY KEY (unique identifier), FOREIGN KEY (referential integrity), CHECK (custom validation rules), and DEFAULT (default values). Entity integrity ensures each row is uniquely identifiable, referential integrity maintains relationships between tables, and domain integrity ensures data values are valid. Understanding data integrity is fundamental for designing robust databases that prevent data corruption, maintain consistency, and support business rules effectively.`,
    code: null,
    table: null
  },
  29: {
    explanation: `OutOfMemoryError in Java occurs when the Java Virtual Machine (JVM) cannot allocate an object because the heap is full. This can happen due to memory leaks, insufficient heap size, large object allocations, or improper data structure usage. When OutOfMemoryError occurs, the application typically crashes or becomes unresponsive. Common causes include: unclosed resources holding references, collections growing indefinitely, caching too much data, loading large files into memory, or recursive algorithms without proper termination. Solutions include increasing heap size with -Xmx parameter, fixing memory leaks by removing unnecessary references, using weak references for caches, implementing proper resource cleanup, and using streaming for large data processing. Understanding memory management and OutOfMemoryError is crucial for building stable Java applications.`,
    code: null,
    table: null
  },
  30: {
    explanation: `Memory cleanup in Java is primarily handled by the Garbage Collector (GC), which automatically reclaims memory occupied by objects that are no longer reachable. However, developers can influence GC behavior through best practices: explicitly nullifying references when objects are no longer needed, using try-with-resources for automatic resource cleanup, avoiding memory leaks by removing references from collections, using weak references for caches, and choosing appropriate data structures. For manual memory management in specific scenarios, you can call System.gc() to suggest garbage collection (though not guaranteed), use memory-mapped files for large data, or implement object pooling for frequently created objects. Understanding when and how to assist memory cleanup is important for building efficient Java applications, especially in memory-constrained environments.`,
    code: null,
    table: null
  },
  31: {
    explanation: `Common exceptions faced in Java projects include NullPointerException (NPE) when accessing methods on null objects, ArrayIndexOutOfBoundsException when accessing invalid array indices, ClassCastException when improper type casting occurs, IllegalArgumentException when invalid arguments are passed, NumberFormatException when parsing invalid numbers, and IOException for I/O operations. Other common exceptions include SQLException for database errors, ConcurrentModificationException when modifying collections during iteration, and IllegalStateException for invalid method calls. Understanding these exceptions, their causes, and proper handling strategies is essential for building robust applications. Best practices include validating inputs, using Optional to avoid NPE, proper exception handling with try-catch-finally, and logging exceptions for debugging.`,
    code: null,
    table: null
  },
  32: {
    explanation: `Reading a file from a remote location that might not be available at runtime requires robust error handling to prevent application crashes. The solution involves using try-catch blocks to handle FileNotFoundException, IOException, and other potential exceptions. Best practices include: checking if the file exists before reading, using proper resource management with try-with-resources, implementing retry logic for transient failures, providing meaningful error messages, and having fallback mechanisms. For remote files, consider using URL connections with timeouts, handling network exceptions, and implementing circuit breakers for repeated failures. This pattern is essential for building resilient applications that can handle external dependencies gracefully without crashing.`,
    code: `// Java 8 Solution using try-with-resources
import java.io.*;
import java.net.*;

public class Solution {
    public String readFileFromRemote(String fileUrl) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new URL(fileUrl).openStream()))) {
            return reader.lines().collect(Collectors.joining("\n"));
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + fileUrl);
            return null;
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return null;
        }
    }
}

// Without Java 8 Solution
import java.io.*;
import java.net.*;

public class Solution {
    public String readFileFromRemote(String fileUrl) {
        BufferedReader reader = null;
        try {
            URL url = new URL(fileUrl);
            reader = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            return content.toString();
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + fileUrl);
            return null;
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return null;
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error closing reader: " + e.getMessage());
                }
            }
        }
    }
}

// With retry logic
import java.io.*;
import java.net.*;

public class Solution {
    public String readFileWithRetry(String fileUrl, int maxRetries) {
        for (int i = 0; i < maxRetries; i++) {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new URL(fileUrl).openStream()))) {
                return reader.lines().collect(Collectors.joining("\n"));
            } catch (IOException e) {
                if (i == maxRetries - 1) {
                    System.err.println("Failed after " + maxRetries + " attempts");
                    return null;
                }
                try {
                    Thread.sleep(1000 * (i + 1)); // Exponential backoff
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return null;
                }
            }
        }
        return null;
    }
}`,
    table: null
  },
  33: {
    explanation: `Try-with-resources is a Java 7 feature that automatically closes resources that implement AutoCloseable interface, ensuring proper resource cleanup even when exceptions occur. It eliminates the need for explicit finally blocks to close resources, reducing boilerplate code and preventing resource leaks. The syntax uses try-with-resources statement where resources are declared in the try statement and are automatically closed when the block exits, whether normally or due to an exception. Multiple resources can be declared separated by semicolons. Resources are closed in the reverse order of their creation. This feature is essential for writing robust code that handles I/O operations, database connections, and other resources that require proper cleanup to prevent leaks and ensure system stability.`,
    code: `// Traditional approach (before Java 7)
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    // read file
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// Try-with-resources (Java 7+)
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    // read file
} catch (IOException e) {
    e.printStackTrace();
}

// Multiple resources
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
     BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    // read and write
} catch (IOException e) {
    e.printStackTrace();
}

// Custom AutoCloseable class
class MyResource implements AutoCloseable {
    public void doSomething() {
        System.out.println("Doing something");
    }
    
    @Override
    public void close() {
        System.out.println("Resource closed");
    }
}

// Using custom resource
try (MyResource resource = new MyResource()) {
    resource.doSomething();
} // close() is called automatically`,
    table: null
  },
  34: {
    explanation: `The Object class in Java is the root of the class hierarchy and provides several fundamental methods that all classes inherit. Key methods include: getClass() returns the runtime class of the object, hashCode() returns a hash code value for the object, equals() indicates whether some other object is "equal to" this one, clone() creates and returns a copy of the object, toString() returns a string representation of the object, notify() wakes up a single thread waiting on the object's monitor, notifyAll() wakes up all threads waiting on the object's monitor, wait() causes the current thread to wait until another thread invokes notify() or notifyAll(), and finalize() is called by the garbage collector before an object is reclaimed. Understanding these methods is crucial for implementing proper object behavior, especially equals() and hashCode() for collections, and toString() for debugging.`,
    code: `public class Example {
    private int id;
    private String name;
    
    // getClass() - returns runtime class
    public void printClass() {
        System.out.println(this.getClass().getName());
    }
    
    // equals() - should be overridden with hashCode()
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Example example = (Example) obj;
        return id == example.id && Objects.equals(name, example.name);
    }
    
    // hashCode() - should be overridden with equals()
    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
    
    // toString() - for debugging
    @Override
    public String toString() {
        return "Example{id=" + id + ", name='" + name + "'}";
    }
    
    // clone() - must implement Cloneable
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    
    // Thread communication methods
    public synchronized void waitForSignal() throws InterruptedException {
        wait(); // releases lock
    }
    
    public synchronized void sendSignal() {
        notify(); // wakes up one waiting thread
    }
    
    public synchronized void sendSignalToAll() {
        notifyAll(); // wakes up all waiting threads
    }
}`,
    table: `| Method | Purpose | Override Required |
|--------|---------|------------------|
| getClass() | Get runtime class | No |
| hashCode() | Get hash code | Yes (with equals) |
| equals() | Compare objects | Yes (with hashCode) |
| clone() | Create copy | Yes (implement Cloneable) |
| toString() | String representation | Recommended |
| notify() | Wake one thread | No |
| notifyAll() | Wake all threads | No |
| wait() | Wait for signal | No |
| finalize() | Cleanup before GC | Deprecated |`
  },
  35: {
    explanation: `The contract between equals() and hashCode() in Java is a fundamental requirement for objects used in hash-based collections like HashMap, HashSet, and Hashtable. The contract states that if two objects are equal according to equals(), they must return the same hashCode(). However, two objects with the same hashCode() are not necessarily equal. Violating this contract leads to unpredictable behavior in collections, such as duplicate entries in sets or inability to retrieve values from maps. When overriding equals(), you must also override hashCode() to maintain this contract. The hashCode() method should use the same fields that equals() uses for comparison. Understanding this contract is essential for implementing custom classes that work correctly with Java's collection framework.`,
    code: null,
    table: null
  },
  36: {
    explanation: `The difference between == and equals() in Java is a fundamental concept that often confuses beginners. The == operator compares object references, checking if two references point to the same object in memory (reference equality). The equals() method compares object contents, checking if two objects are logically equivalent (value equality). For primitive types, == compares values directly. For objects, == compares references unless the class overrides equals() to compare contents. The String class overrides equals() to compare character sequences, so "hello".equals("hello") returns true even if they're different objects. Understanding this distinction is crucial for proper object comparison and avoiding bugs in conditional logic and collection operations.`,
    code: null,
    table: `| Aspect | == Operator | equals() Method |
|--------|-------------|----------------|
| Comparison Type | Reference equality | Value equality |
| Primitives | Compares values | Not applicable |
| Objects | Compares references | Compares contents (if overridden) |
| String | Compares references | Compares characters |
| Override | Cannot override | Can override |
| Default Behavior | Reference comparison | Reference comparison (Object class) |
| Use Case | Null checks, singleton | Content comparison |
| Example | str1 == str2 | str1.equals(str2) |`
  },
  37: {
    explanation: `An immutable class in Java is a class whose instances cannot be modified after creation. Once an immutable object is created, its state remains constant throughout its lifetime. Key characteristics include: all fields are final and private, no setter methods, defensive copying of mutable fields in constructors and getters, the class is declared final to prevent subclassing, and proper equals() and hashCode() implementation. Immutable objects are thread-safe by design, have no synchronization overhead, can be safely shared, and make good map keys and set elements. Examples include String, Integer, and other wrapper classes. Understanding immutability is important for designing thread-safe applications and reducing bugs related to unexpected state changes.`,
    code: null,
    table: null
  },
  38: {
    explanation: `Creating a custom immutable class in Java requires following specific design patterns to ensure true immutability. The class should be declared final to prevent inheritance, all fields should be private and final, the constructor should initialize all fields (including defensive copies of mutable objects), getter methods should return defensive copies of mutable fields, and there should be no setter methods. Additionally, properly override equals(), hashCode(), and toString() methods. This pattern ensures thread safety, prevents accidental modification, and makes the class suitable for use as keys in collections. Understanding how to create immutable classes is essential for building robust, thread-safe applications.`,
    code: `public final class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;
    
    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy of mutable list
        this.hobbies = new ArrayList<>(hobbies);
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Defensive copy in getter
    public List<String> getHobbies() {
        return new ArrayList<>(hobbies);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ImmutablePerson that = (ImmutablePerson) o;
        return age == that.age && 
               Objects.equals(name, that.name) && 
               Objects.equals(hobbies, that.hobbies);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age, hobbies);
    }
    
    @Override
    public String toString() {
        return "ImmutablePerson{name='" + name + "', age=" + age + 
               ", hobbies=" + hobbies + "}";
    }
}

// Usage
List<String> hobbies = Arrays.asList("Reading", "Coding");
ImmutablePerson person = new ImmutablePerson("John", 30, hobbies);

// Cannot modify - all fields are final
// person.age = 31; // Compilation error

// Getter returns copy, so modification doesn't affect original
person.getHobbies().add("Swimming"); // Doesn't affect person`,
    table: null
  },
  39: {
    explanation: `String, StringBuffer, and StringBuilder in Java are all used for string manipulation but have different characteristics. String is immutable, meaning once created, its value cannot be changed. String operations create new String objects, which can be inefficient for frequent modifications. StringBuffer is mutable and thread-safe due to synchronized methods, making it suitable for multi-threaded environments but with performance overhead. StringBuilder is mutable like StringBuffer but not thread-safe, making it faster for single-threaded scenarios. StringBuffer and StringBuilder both provide methods like append(), insert(), delete(), and reverse() for in-place modifications. Choosing the right class depends on whether immutability is needed (String), thread safety is required (StringBuffer), or performance is critical in single-threaded context (StringBuilder).`,
    code: null,
    table: `| Feature | String | StringBuffer | StringBuilder |
|----------|--------|--------------|---------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread Safety | Thread-safe | Thread-safe | Not thread-safe |
| Performance | Slow for modifications | Moderate | Fast |
| Synchronization | N/A | Yes | No |
| Use Case | Constants, keys | Multi-threaded | Single-threaded |
| Memory | Creates new objects | Modifies in-place | Modifies in-place |
| Introduced | Java 1.0 | Java 1.0 | Java 1.5 |
| Example | String s = "hello" | StringBuffer sb = new StringBuffer() | StringBuilder sb = new StringBuilder() |`
  },
  40: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  41: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  42: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  43: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  44: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  45: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  46: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  47: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  48: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  49: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  50: {
    explanation: `Note: This question ID was skipped in the original data. Please verify the correct question ID.`,
    code: null,
    table: null
  },
  64: {
    explanation: `Using balanced trees in HashMap provides significant performance benefits when dealing with hash collisions. In Java 8+, when a bucket's linked list size exceeds 8 elements (TREEIFY_THRESHOLD), it automatically converts to a red-black tree (balanced tree). This optimization changes the lookup performance from O(n) for linked lists to O(log n) for trees, which is a substantial improvement for heavily populated buckets. The balanced tree structure ensures that operations like search, insert, and delete remain efficient even with many collisions. This feature is particularly beneficial in scenarios with poor hash distribution or when many keys hash to the same bucket. Understanding this optimization helps in designing hash functions and choosing appropriate initial capacities and load factors for HashMaps to balance memory usage and performance.`,
    code: null,
    table: null
  },
  65: {
    explanation: `Garbage collection in Java is an automatic memory management process that reclaims memory occupied by objects that are no longer reachable. The JVM uses generational garbage collection, dividing the heap into Young Generation (Eden, Survivor spaces) and Old Generation. Objects are created in Eden, survive multiple garbage collections to move to Survivor spaces, and eventually to Old Generation if they survive long enough. Different GC algorithms exist: Serial GC (single-threaded), Parallel GC (multi-threaded), G1 GC (concurrent, low pause), and ZGC/Shenandoah (ultra-low pause). GC runs when the heap is full or explicitly requested. Understanding GC is crucial for tuning performance, avoiding memory leaks, and choosing appropriate JVM parameters for production applications.`,
    code: null,
    table: null
  },
  66: {
    explanation: `Memory management in Java is primarily handled by the JVM's automatic garbage collection, but developers can influence it through design choices and JVM configuration. The JVM heap is divided into Young Generation (for short-lived objects) and Old Generation (for long-lived objects). Stack memory stores method calls and local variables, while heap memory stores objects. Developers can optimize memory usage by: reusing objects, using primitive types instead of wrappers, choosing appropriate collection types, implementing object pooling, and avoiding memory leaks by removing references. JVM parameters like -Xms (initial heap), -Xmx (max heap), and -XX:NewRatio control memory allocation. Understanding memory management is essential for building efficient Java applications and troubleshooting performance issues.`,
    code: null,
    table: null
  },
  67: {
    explanation: `The return type of the filter operation in Java Streams is a Stream, not a Collection. This is a key characteristic of lazy evaluation in Streams - filter() is an intermediate operation that returns a new Stream, allowing chaining of multiple operations before a terminal operation triggers actual processing. The Stream returned by filter() contains only elements that match the predicate, but no actual filtering happens until a terminal operation like collect(), count(), or forEach() is called. This design enables efficient pipelining and potential optimization by the Stream implementation. Understanding that filter() returns a Stream is crucial for correctly chaining Stream operations and avoiding common mistakes like trying to use Collection methods on the result.`,
    code: `// filter() returns Stream<T>
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// filter() returns Stream<Integer>, not List
Stream<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0); // Returns Stream<Integer>

// Need terminal operation to get results
List<Integer> evenList = evenNumbers.collect(Collectors.toList());

// Chaining multiple operations
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)      // Returns Stream<Integer>
    .map(n -> n * n)              // Returns Stream<Integer>
    .sorted()                     // Returns Stream<Integer>
    .collect(Collectors.toList()); // Terminal operation

// filter() with predicate
Stream<String> longNames = names.stream()
    .filter(name -> name.length() > 5); // Returns Stream<String>

// Using method reference
Stream<String> nonNull = list.stream()
    .filter(Objects::nonNull); // Returns Stream<String>`,
    table: null
  },
  68: {
    explanation: `The Executor Framework in Java provides a higher-level replacement for working with threads directly. It's part of the java.util.concurrent package and includes Executor, ExecutorService, ScheduledExecutorService, and Executors utility class. The framework abstracts thread management, providing thread pools, task scheduling, and resource management. Key benefits include: reusing threads (avoiding thread creation overhead), limiting concurrent threads (preventing resource exhaustion), separating task submission from execution policy, and providing built-in mechanisms for shutdown and task tracking. Common implementations include FixedThreadPool (fixed number of threads), CachedThreadPool (creates threads as needed), and ScheduledThreadPool (for delayed/periodic tasks). Understanding the Executor Framework is essential for writing efficient concurrent Java applications.`,
    code: `// Using ExecutorService with FixedThreadPool
ExecutorService executor = Executors.newFixedThreadPool(5);

// Submit tasks
Future<Integer> future1 = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

Future<String> future2 = executor.submit(() -> {
    return "Task completed";
});

// Execute runnable
executor.execute(() -> {
    System.out.println("Running task");
});

// Get results
try {
    Integer result = future1.get(); // Blocks until complete
    String str = future2.get();
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}

// Shutdown executor
executor.shutdown();
try {
    executor.awaitTermination(60, TimeUnit.SECONDS);
} catch (InterruptedException e) {
    executor.shutdownNow();
}

// Using Callable with return value
List<Callable<String>> tasks = Arrays.asList(
    () -> "Task 1",
    () -> "Task 2",
    () -> "Task 3"
);

List<Future<String>> futures = executor.invokeAll(tasks);

// ScheduledExecutorService for delayed tasks
ScheduledExecutorService scheduledExecutor = Executors.newScheduledThreadPool(2);
scheduledExecutor.schedule(() -> {
    System.out.println("Delayed task");
}, 5, TimeUnit.SECONDS);

// Periodic task
scheduledExecutor.scheduleAtFixedRate(() -> {
    System.out.println("Periodic task");
}, 0, 1, TimeUnit.SECONDS);`,
    table: null
  },
  69: {
    explanation: `Java provides multiple ways to handle concurrency: 1) Thread class and Runnable interface for basic thread management, 2) Executor Framework for thread pooling and task management, 3) Synchronized blocks and methods for mutual exclusion, 4) volatile keyword for visibility guarantees, 5) Atomic classes for lock-free thread-safe operations, 6) Lock interfaces (ReentrantLock) for flexible locking, 7) Concurrent collections for thread-safe data structures, 8) CountDownLatch, CyclicBarrier, and Semaphore for coordination, 9) CompletableFuture for asynchronous programming, 10) Fork/Join framework for parallel task execution. Choosing the right approach depends on the specific use case, performance requirements, and complexity. Understanding these different mechanisms is crucial for writing efficient concurrent Java applications.`,
    code: null,
    table: null
  },
  70: {
    explanation: `Streams in Java are immutable, meaning once a Stream is created, it cannot be modified. Operations on Streams return new Stream objects rather than modifying the original. This immutability is a key design principle that enables safe parallel processing and functional-style programming. When you call intermediate operations like filter(), map(), or sorted(), they return new Stream instances without modifying the source. Terminal operations like collect() or forEach() consume the Stream and cannot be called again on the same Stream instance. This design prevents side effects and makes Stream operations predictable and thread-safe. Understanding Stream immutability is essential for correctly using the Stream API and avoiding common mistakes like reusing consumed Streams.`,
    code: null,
    table: null
  },
  71: {
    explanation: `Streams vs Collections in Java represent different paradigms for data processing. Collections are data structures that store elements in memory and allow modification, while Streams are sequences of elements that support functional-style operations without storing data. Collections are eager (data is loaded immediately), mutable (can be modified), and support random access. Streams are lazy (operations are deferred), immutable (operations return new Streams), and support sequential and parallel processing. Collections are ideal for storing and accessing data, while Streams excel at data transformation and processing pipelines. Understanding the differences helps in choosing the right tool for specific tasks and writing more efficient, readable code.`,
    code: null,
    table: `| Aspect | Collections | Streams |
|--------|-------------|---------|
| Data Storage | Stores data in memory | Doesn't store data |
| Evaluation | Eager | Lazy |
| Mutability | Mutable | Immutable |
| Operations | Add, remove, modify | Map, filter, reduce |
| Traversal | Iterator, for-each | forEach, terminal ops |
| Parallel | Manual threading | Built-in parallel() |
| Reuse | Can traverse multiple times | Can only traverse once |
| Memory | Holds all elements | Processes on-demand |
| Use Case | Data storage | Data processing |
| Example | List, Set, Map | stream(), parallelStream() |`
  },
  72: {
    explanation: `Lambda expressions in Java (introduced in Java 8) enable functional programming by allowing you to treat functionality as a method argument or code as data. Lambdas provide a concise way to implement functional interfaces (interfaces with a single abstract method). They reduce boilerplate code compared to anonymous inner classes, improve readability, and enable more expressive code. Lambdas capture variables from their enclosing scope (effectively final only), can be used with Stream API operations, and enable method references for even more concise syntax. Key use cases include: event handlers, callback functions, Stream operations, and functional interfaces like Predicate, Function, and Consumer. Understanding lambdas is essential for modern Java development and writing clean, functional-style code.`,
    code: `// Lambda expression syntax
(parameters) -> expression
(parameters) -> { statements; }

// Basic lambda
Runnable runnable = () -> System.out.println("Hello");

// Lambda with parameters
Predicate<Integer> isEven = n -> n % 2 == 0;

// Lambda with block
Consumer<String> printer = str -> {
    System.out.println("Printing: " + str);
    System.out.println("Length: " + str.length());
};

// Lambda in Stream API
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<String> upperNames = names.stream()
    .map(name -> name.toUpperCase())
    .collect(Collectors.toList());

// Method references (more concise)
List<String> upperNames = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Lambda with multiple parameters
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Lambda in functional interfaces
Function<String, Integer> stringLength = s -> s.length();
Predicate<String> startsWithA = s -> s.startsWith("A");
Consumer<String> print = s -> System.out.println(s);

// Capturing variables (effectively final)
int threshold = 5;
Predicate<Integer> isGreaterThan = n -> n > threshold;`,
    table: null
  },
  73: {
    explanation: `Functional programming in Java offers several benefits: immutability reduces side effects and makes code easier to reason about, pure functions are easier to test and debug, higher-order functions enable code reuse and abstraction, lazy evaluation improves performance by avoiding unnecessary computations, and declarative code is more readable and expressive. Java 8 introduced functional programming features like lambda expressions, Stream API, and functional interfaces. These features enable more concise code, better parallel processing capabilities, and reduced boilerplate. Functional programming also promotes better separation of concerns and makes code more maintainable. Understanding these benefits helps in writing cleaner, more efficient Java code and leveraging the full power of modern Java features.`,
    code: null,
    table: null
  },
  74: {
    explanation: `Inter-thread communication in Java happens through wait(), notify(), and notifyAll() methods defined in the Object class. These methods allow threads to coordinate their actions by waiting for conditions and signaling when conditions change. wait() causes the current thread to release the lock and wait until another thread calls notify() or notifyAll(). notify() wakes up a single waiting thread, while notifyAll() wakes up all waiting threads. These methods must be called within synchronized blocks or methods on the same object. Proper inter-thread communication is essential for producer-consumer problems, resource pooling, and coordinating complex workflows. Understanding these mechanisms is crucial for writing correct concurrent programs that avoid race conditions and deadlocks.`,
    code: `// Producer-Consumer example using wait/notify
class SharedBuffer {
    private List<Integer> buffer = new ArrayList<>();
    private int capacity = 5;

    public synchronized void produce(int value) throws InterruptedException {
        while (buffer.size() == capacity) {
            wait(); // Wait if buffer is full
        }
        buffer.add(value);
        System.out.println("Produced: " + value);
        notifyAll(); // Notify consumers
    }

    public synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {
            wait(); // Wait if buffer is empty
        }
        int value = buffer.remove(0);
        System.out.println("Consumed: " + value);
        notifyAll(); // Notify producers
        return value;
    }
}

// Using the buffer
SharedBuffer buffer = new SharedBuffer();

// Producer thread
Thread producer = new Thread(() -> {
    try {
        for (int i = 0; i < 10; i++) {
            buffer.produce(i);
            Thread.sleep(100);
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

// Consumer thread
Thread consumer = new Thread(() -> {
    try {
        for (int i = 0; i < 10; i++) {
            buffer.consume();
            Thread.sleep(150);
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

producer.start();
consumer.start();`,
    table: null
  },
  75: {
    explanation: `Making Thread 1's output become Thread 2's input requires inter-thread communication mechanisms. Several approaches exist: 1) Using shared data structures with synchronized access, 2) Using BlockingQueue for thread-safe data transfer, 3) Using PipedInputStream/PipedOutputStream for stream-based communication, 4) Using wait/notify on shared objects, 5) Using Exchanger for direct data exchange between threads. The BlockingQueue approach is often preferred as it's thread-safe by design and handles blocking automatically. This pattern is common in producer-consumer scenarios where one thread generates data and another processes it. Understanding these communication patterns is essential for building multi-threaded applications where threads need to coordinate and share data safely.`,
    code: `// Using BlockingQueue (recommended approach)
import java.util.concurrent.*;

public class ThreadCommunication {
    private static BlockingQueue<String> queue = new LinkedBlockingQueue<>();

    public static void main(String[] args) {
        // Thread 1: Producer
        Thread producer = new Thread(() -> {
            try {
                for (int i = 0; i < 5; i++) {
                    String data = "Data " + i;
                    queue.put(data); // Blocks if queue is full
                    System.out.println("Thread 1 produced: " + data);
                    Thread.sleep(500);
                }
                queue.put("DONE"); // Signal completion
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // Thread 2: Consumer
        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    String data = queue.take(); // Blocks if queue is empty
                    if (data.equals("DONE")) break;
                    System.out.println("Thread 2 consumed: " + data);
                    // Process data here
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}

// Using Exchanger for direct exchange
import java.util.concurrent.*;

public class ExchangerExample {
    private static Exchanger<String> exchanger = new Exchanger<>();

    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            try {
                String data = "Hello from Thread 1";
                String response = exchanger.exchange(data);
                System.out.println("Thread 1 received: " + response);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread thread2 = new Thread(() -> {
            try {
                String data = "Hello from Thread 2";
                String response = exchanger.exchange(data);
                System.out.println("Thread 2 received: " + response);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        thread1.start();
        thread2.start();
    }
}`,
    table: null
  },
  76: {
    explanation: `Choosing between abstract class and interface depends on your design requirements. Use an abstract class when you want to share code among closely related classes, need non-public members, or want to declare non-static/non-final fields. Use an interface when you want to define a contract for unrelated classes, need multiple inheritance of type, or want to achieve polymorphism across different class hierarchies. Key differences: abstract classes can have constructors, instance variables, and implemented methods, while interfaces can only have constants and abstract methods (prior to Java 8). From Java 8, interfaces can have default and static methods. From Java 9, interfaces can have private methods. Understanding these distinctions helps in making appropriate design decisions and creating flexible, maintainable code architectures.`,
    code: null,
    table: null
  },
  77: {
    explanation: `Yes, you can extend an abstract class to another abstract class. This is a common pattern in Java for creating hierarchical class structures where each level adds more specific behavior. The child abstract class can implement some abstract methods from the parent while leaving others abstract for concrete classes to implement. This allows for incremental implementation and code reuse across the hierarchy. The child abstract class can also add new abstract methods that concrete subclasses must implement. This pattern is useful for building complex class hierarchies with shared functionality at different levels of abstraction. Understanding this capability helps in designing flexible class hierarchies that promote code reuse while maintaining appropriate abstraction levels.`,
    code: null,
    table: null
  },
  78: {
    explanation: `Yes, you can extend one functional interface from another functional interface, but with an important constraint: the resulting interface must still be a functional interface (have exactly one abstract method). If the parent functional interface has an abstract method, and the child adds another abstract method, the child is no longer a functional interface. However, if the child only adds default methods, static methods, or overrides existing methods, it remains a functional interface. This allows for building hierarchies of functional interfaces with shared default behaviors. Understanding this constraint is important when designing functional interface hierarchies for lambda expressions and method references.`,
    code: null,
    table: null
  },
  79: {
    explanation: `Creating a custom marker interface in Java is straightforward - it's an interface with no methods. Marker interfaces are used to tag classes to indicate that they belong to a certain category or have certain capabilities. Examples in Java include Serializable, Cloneable, and Remote. To create a custom marker interface, simply define an interface with no methods. Classes then implement this interface to mark themselves. Marker interfaces can be checked using instanceof operator at runtime. While annotations have largely replaced marker interfaces in modern Java, marker interfaces are still useful for type safety and compile-time checking. Understanding marker interfaces helps in designing type-safe APIs and understanding Java's built-in marker interfaces.`,
    code: `// Custom marker interface
public interface MyMarker {
    // No methods - it's a marker interface
}

// Class implementing the marker interface
public class MyClass implements MyMarker {
    private String data;
    
    public MyClass(String data) {
        this.data = data;
    }
    
    public String getData() {
        return data;
    }
}

// Checking for marker interface
public class MarkerExample {
    public static void processObject(Object obj) {
        if (obj instanceof MyMarker) {
            System.out.println("Object is marked with MyMarker");
            MyClass myObj = (MyClass) obj;
            System.out.println("Data: " + myObj.getData());
        } else {
            System.out.println("Object is not marked");
        }
    }
    
    public static void main(String[] args) {
        MyClass obj1 = new MyClass("Hello");
        String obj2 = "Not marked";
        
        processObject(obj1); // Will be recognized
        processObject(obj2); // Will not be recognized
    }
}

// Using marker interface for type safety
public interface SerializableEntity {
}

public class User implements SerializableEntity {
    private Long id;
    private String name;
    
    // Constructor, getters, setters
}

// Method that only accepts marked objects
public void saveEntity(SerializableEntity entity) {
    // Only objects implementing SerializableEntity can be passed
}`,
    table: null
  },
  80: {
    explanation: `The N+1 query problem in SQL occurs when a query fetches N parent records and then executes N additional queries to fetch related child records for each parent. This happens due to improper join strategies or lack of proper query optimization. Solutions include: 1) Using proper JOINs to fetch related data in a single query, 2) Using subqueries with IN clauses, 3) Using window functions for correlated data, 4) Using EXISTS instead of IN for better performance, 5) Proper indexing on join columns, 6) Using materialized views for complex queries, 7) Query batching to combine multiple queries. Understanding and preventing the N+1 problem is crucial for database performance, especially in applications with complex data relationships.`,
    code: `-- Problem: N+1 queries
-- Query 1: Get all departments
SELECT * FROM departments;

-- Then N queries: Get employees for each department
SELECT * FROM employees WHERE department_id = 1;
SELECT * FROM employees WHERE department_id = 2;
-- ... and so on for each department

-- Solution 1: Single query with JOIN
SELECT d.department_name, e.employee_name, e.salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
ORDER BY d.department_name;

-- Solution 2: Using subquery with IN
SELECT * FROM employees 
WHERE department_id IN (SELECT department_id FROM departments);

-- Solution 3: Using EXISTS (often faster than IN)
SELECT d.department_name, d.department_id
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e 
    WHERE e.department_id = d.department_id
);

-- Solution 4: Using window functions
SELECT d.department_name, 
       e.employee_name,
       COUNT(*) OVER (PARTITION BY d.department_id) as emp_count
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id;

-- Solution 5: Using CTE for complex queries
WITH DeptEmployees AS (
    SELECT d.department_id, d.department_name, 
           e.employee_name, e.salary
    FROM departments d
    LEFT JOIN employees e ON d.department_id = e.department_id
)
SELECT * FROM DeptEmployees 
WHERE salary > 50000
ORDER BY department_name, salary DESC;`,
    table: null
  },
  81: {
    explanation: `Creating indexes in SQL is essential for improving query performance on large tables. Indexes are created using the CREATE INDEX statement and can be single-column, multi-column (composite), or unique indexes. The syntax varies slightly between databases but follows similar patterns. Indexes should be created on columns frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses. However, indexes have trade-offs: they improve read performance but slow down write operations (INSERT, UPDATE, DELETE) and consume additional storage. Understanding when and how to create indexes is crucial for database performance tuning. Different index types include B-Tree (default), Hash (for equality), Bitmap (for low-cardinality), and Full-text (for text search).`,
    code: `-- Basic index creation
CREATE INDEX idx_employee_name ON employees(employee_name);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Composite index (multiple columns)
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Index with specific options (MySQL)
CREATE INDEX idx_employee_name 
ON employees(employee_name) 
USING BTREE;

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_employees 
ON employees(employee_name) 
WHERE is_active = true;

-- Drop index
DROP INDEX idx_employee_name ON employees;

-- Check existing indexes
SHOW INDEX FROM employees; -- MySQL
SELECT * FROM pg_indexes WHERE tablename = 'employees'; -- PostgreSQL

-- Create index with fill factor (SQL Server)
CREATE INDEX idx_employee_name 
ON employees(employee_name) 
WITH (FILLFACTOR = 80);

-- Clustered index (SQL Server - determines physical storage)
CREATE CLUSTERED INDEX idx_employee_id 
ON employees(employee_id);

-- Non-clustered index (SQL Server)
CREATE NONCLUSTERED INDEX idx_employee_name 
ON employees(employee_name);`,
    table: null
  },
  134: {
    explanation: `@Qualifier and @Autowired are both Spring annotations used for dependency injection, but serve different purposes. @Autowired is used to automatically inject dependencies by type, while @Qualifier is used to specify which bean to inject when there are multiple beans of the same type. @Autowired alone can cause ambiguity when multiple beans of the same type exist, leading to NoUniqueBeanDefinitionException. @Qualifier resolves this by specifying the bean name to inject. You can also use @Primary to mark a bean as the default candidate for autowiring. Understanding the difference between these annotations is essential for managing dependency injection in Spring applications, especially when dealing with multiple implementations of the same interface.`,
    code: null,
    table: null
  },
  135: {
    explanation: `Eureka Client is a service discovery client in Netflix Eureka that allows microservices to register themselves with the Eureka Server and discover other registered services. Eureka Client periodically sends heartbeats to the server to maintain registration status and fetches the service registry to discover available services. Key features include: automatic registration, service discovery, load balancing through Ribbon integration, health checks, and fault tolerance. Eureka Client enables dynamic service discovery without hardcoding service URLs, making microservices more flexible and resilient. Understanding Eureka Client is essential for building microservices architectures with service discovery capabilities.`,
    code: null,
    table: null
  },
  136: {
    explanation: `API Gateway is a critical component in microservices architecture that acts as a single entry point for all client requests. It handles cross-cutting concerns like authentication, authorization, rate limiting, load balancing, caching, request/response transformation, and routing to appropriate backend services. API Gateway simplifies client communication by providing a unified interface, hides backend service complexity, and enables centralized management of API policies. Popular implementations include Spring Cloud Gateway, Netflix Zuul, Kong, and AWS API Gateway. Understanding API Gateway is essential for designing scalable microservices architectures with proper separation of concerns and centralized API management.`,
    code: null,
    table: null
  },
  137: {
    explanation: `Service Registry is a fundamental component in microservices architecture that maintains a registry of available service instances and their locations. Services register themselves with the registry on startup and deregister on shutdown. Other services query the registry to discover available service instances. Service Registry enables dynamic service discovery, load balancing, and fault tolerance by automatically removing unhealthy instances. Popular implementations include Netflix Eureka, HashiCorp Consul, and Zookeeper. Understanding Service Registry is essential for building resilient microservices that can handle service instance changes dynamically without manual configuration.`,
    code: null,
    table: null
  },
  138: {
    explanation: `Defining REST endpoints in Spring Boot is straightforward using annotations like @RestController, @RequestMapping, @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, and @PatchMapping. These annotations map HTTP requests to specific handler methods. You can specify URL paths, HTTP methods, request/response formats, and parameters. Path variables and query parameters can be extracted using @PathVariable and @RequestParam annotations. Request bodies are handled with @RequestBody, and response bodies are automatically serialized to JSON. Understanding REST endpoint definition is essential for building RESTful APIs in Spring Boot applications.`,
    code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    // GET user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST create user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User created = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    // PUT update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id, 
            @RequestBody @Valid User user) {
        return userService.findById(id)
            .map(existingUser -> {
                user.setId(id);
                User updated = userService.save(user);
                return ResponseEntity.ok(updated);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.existsById(id)) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // GET with query parameters
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam String name,
            @RequestParam(required = false) Integer minAge) {
        List<User> users = userService.search(name, minAge);
        return ResponseEntity.ok(users);
    }
}`,
    table: null
  },
  139: {
    explanation: `@PutMapping and @PostMapping are both used in Spring Boot for handling HTTP requests, but they serve different purposes according to REST principles. @PostMapping is used for creating new resources and should typically return the created resource with a 201 status code. @PutMapping is used for updating existing resources and should return the updated resource with a 200 or 204 status code. While both can accept request bodies, @PostMapping is idempotent (multiple requests create multiple resources), while @PutMapping should be idempotent (multiple requests should have the same effect). Understanding the distinction is crucial for designing RESTful APIs that follow proper HTTP semantics and REST principles.`,
    code: null,
    table: `| Aspect | @PostMapping | @PutMapping |
|--------|-------------|------------|
| HTTP Method | POST | PUT |
| Purpose | Create resource | Update resource |
| Idempotent | No | Yes |
| Status Code | 201 Created | 200 OK / 204 No Content |
| Resource ID | Generated by server | Provided by client |
| Example | POST /api/users | PUT /api/users/1 |
| Body | New resource data | Updated resource data |
| Multiple calls | Creates multiple resources | Same result |
| Use Case | New entity | Update existing entity |`
  },
  140: {
    explanation: `Stereotype annotations in Spring are meta-annotations that serve as shortcuts for commonly used annotation combinations. They are called "stereotype" because they represent a specific type or category of component. Common stereotype annotations include @Component (generic), @Service (for service layer), @Repository (for data access layer), and @Controller (for presentation layer). These stereotypes are themselves annotated with @Component and may include additional functionality like @Repository adding exception translation for data access exceptions. Stereotype annotations improve code readability, enable aspect-oriented programming based on component type, and allow for better organization of application layers. Understanding stereotype annotations is essential for writing clean, well-organized Spring applications.`,
    code: null,
    table: null
  },
  168: {
    explanation: `Validating request body on the server side in Spring Boot is essential for ensuring data integrity and preventing invalid data from being processed. Spring Boot provides validation support through the Jakarta Bean Validation API (JSR 380). You can add validation annotations like @NotNull, @NotBlank, @Size, @Min, @Max, @Email, @Pattern, and @Valid to your DTO classes. To enable validation, add @Valid or @Validated annotation to controller method parameters. Validation errors are automatically caught and can be handled using @ExceptionHandler or by returning a BindingResult. Understanding server-side validation is crucial for building robust APIs that reject invalid input early and provide meaningful error messages.`,
    code: `// DTO with validation annotations
public class UserDTO {
    @NotNull(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 120, message = "Age must not exceed 120")
    private Integer age;
    
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Username must be alphanumeric")
    private String username;
    
    // Getters and setters
}

// Controller with validation
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
        // If validation fails, MethodArgumentNotValidException is thrown
        User user = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    // Alternative: Using BindingResult
    @PostMapping("/alternative")
    public ResponseEntity<?> createUserAlternative(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        
        User user = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}

// Custom validation annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface ValidPassword {
    String message() default "Invalid password";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        // Custom validation logic
        return password != null && password.length() >= 8 
            && password.matches(".*[A-Z].*") 
            && password.matches(".*[0-9].*");
    }
}

// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        return ResponseEntity.badRequest().body(errors);
    }
}`,
    table: null
  },
  169: {
    explanation: `Throwing proper custom errors in Spring Boot involves creating custom exception classes, using @ResponseStatus or @ExceptionHandler to handle them, and returning meaningful error responses to clients. Spring Boot provides several ways to handle exceptions: @ResponseStatus for simple status codes, @ExceptionHandler in controllers or @ControllerAdvice for global handling, and ResponseEntity for custom responses. Best practices include: creating specific exception classes for different error scenarios, including error codes and messages, using appropriate HTTP status codes, and providing consistent error response formats. Understanding exception handling is crucial for building user-friendly APIs that communicate errors effectively and help clients handle failures gracefully.`,
    code: `// Custom exception class
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ValidationException extends RuntimeException {
    private List<String> errors;
    
    public ValidationException(List<String> errors) {
        super("Validation failed");
        this.errors = errors;
    }
    
    public List<String> getErrors() {
        return errors;
    }
}

// Error response DTO
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private String path;
    
    // Constructor, getters, setters
}

// Global exception handler with @ControllerAdvice
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            ValidationException ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            String.join(", ", ex.getErrors()),
            LocalDateTime.now(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An unexpected error occurred",
            LocalDateTime.now(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Throwing custom exceptions in service
@Service
public class UserService {
    
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(
                "User not found with id: " + id
            ));
    }
    
    public void createUser(UserDTO userDTO) {
        List<String> errors = validateUser(userDTO);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
        // Create user logic
    }
}`,
    table: null
  },
  170: {
    explanation: `Upgrading from Spring Boot 2.x to Spring 3.x requires careful planning due to significant changes. Major considerations include: 1) Java 17+ is required (Spring Boot 3 doesn't support Java 8 or 11), 2) Jakarta EE 9+ namespace changes (javax.* to jakarta.*), 3) Spring Framework 6 changes, 4) Hibernate 6+ updates, 5) Configuration property changes, 6) Deprecated feature removals, 7) Security configuration updates, 8) Testing framework changes. The upgrade process involves updating dependencies, refactoring code for namespace changes, updating configuration, and thorough testing. Understanding these changes is crucial for successful migration and avoiding runtime issues after upgrade.`,
    code: null,
    table: null
  },
  171: {
    explanation: `OAuth2 with JWT (JSON Web Token) is a modern authentication and authorization framework that enables secure API access without storing user credentials. OAuth2 provides authorization flows (authorization code, implicit, password, client credentials) while JWT serves as a compact, self-contained token for transmitting claims. The flow typically involves: user authenticates with authorization server, receives access token (JWT), client includes token in API requests, resource server validates token signature and claims. JWT contains header, payload (claims), and signature, signed with a secret or private key. Benefits include stateless authentication, cross-domain support, and reduced server load. Understanding OAuth2 with JWT is essential for building secure, scalable modern applications.`,
    code: null,
    table: null
  },
  172: {
    explanation: `Managing key rotation and secure authentication involves periodically changing cryptographic keys while maintaining system availability and security. Key rotation strategies include: 1) Time-based rotation (regular intervals), 2) Event-based rotation (after security incidents), 3) Manual rotation (on-demand). Implementation approaches: maintain multiple active keys with versioning, use key identifiers in tokens, gracefully transition between keys, and maintain key history for token validation. Best practices include using key management services (AWS KMS, HashiCorp Vault), automating rotation, monitoring key usage, and having rollback procedures. Understanding key rotation is crucial for maintaining security while minimizing service disruption.`,
    code: null,
    table: null
  },
  173: {
    explanation: `RestTemplate is Spring's synchronous HTTP client for making RESTful API calls. It provides methods for common HTTP operations: getForObject(), getForEntity(), postForObject(), postForEntity(), exchange(), and execute(). RestTemplate supports various HTTP methods, request/response conversion, error handling, and interceptors. Key features include: automatic message conversion (JSON, XML), URI template support, request/response interceptors, and exception handling. While RestTemplate is being replaced by WebClient in reactive stacks, it remains widely used in traditional Spring applications. Understanding RestTemplate methods is essential for consuming REST APIs in Spring applications.`,
    code: `@Service
public class ApiService {
    
    private final RestTemplate restTemplate;
    
    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    // GET request returning object directly
    public User getUserById(Long id) {
        String url = "https://api.example.com/users/{id}";
        return restTemplate.getForObject(url, User.class, id);
    }
    
    // GET request returning ResponseEntity with full response
    public ResponseEntity<User> getUserWithResponse(Long id) {
        String url = "https://api.example.com/users/{id}";
        return restTemplate.getForEntity(url, User.class, id);
    }
    
    // POST request
    public User createUser(User user) {
        String url = "https://api.example.com/users";
        return restTemplate.postForObject(url, user, User.class);
    }
    
    // POST with headers
    public User createUserWithHeaders(User user, String authToken) {
        String url = "https://api.example.com/users";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authToken);
        
        HttpEntity<User> request = new HttpEntity<>(user, headers);
        
        return restTemplate.postForObject(url, request, User.class);
    }
    
    // PUT request
    public void updateUser(Long id, User user) {
        String url = "https://api.example.com/users/{id}";
        restTemplate.put(url, user, id);
    }
    
    // DELETE request
    public void deleteUser(Long id) {
        String url = "https://api.example.com/users/{id}";
        restTemplate.delete(url, id);
    }
    
    // Using exchange for full control
    public User getUserWithExchange(Long id) {
        String url = "https://api.example.com/users/{id}";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        
        HttpEntity<?> entity = new HttpEntity<>(headers);
        
        ResponseEntity<User> response = restTemplate.exchange(
            url, 
            HttpMethod.GET, 
            entity, 
            User.class, 
            id
        );
        
        return response.getBody();
    }
    
    // Error handling
    public User getUserWithErrorHandling(Long id) {
        try {
            String url = "https://api.example.com/users/{id}";
            return restTemplate.getForObject(url, User.class, id);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new ResourceNotFoundException("User not found");
            }
            throw e;
        }
    }
}

// RestTemplate configuration
@Configuration
public class RestTemplateConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        
        // Set timeout
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        
        // Add interceptors
        restTemplate.setInterceptors(Arrays.asList(new LoggingInterceptor()));
        
        return restTemplate;
    }
}

// Custom interceptor
public class LoggingInterceptor implements ClientHttpRequestInterceptor {
    @Override
    public ClientHttpResponse intercept(
            HttpRequest request, 
            byte[] body, 
            ClientHttpRequestExecution execution) throws IOException {
        
        System.out.println("Request: " + request.getMethod() + " " + request.getURI());
        
        ClientHttpResponse response = execution.execute(request, body);
        
        System.out.println("Response: " + response.getStatusCode());
        
        return response;
    }
}`,
    table: null
  },
  174: {
    explanation: `Securing microservices involves implementing multiple layers of security: authentication (verifying identity), authorization (controlling access), encryption (protecting data in transit and at rest), network security (firewalls, VPNs), and monitoring (detecting threats). Key approaches include: OAuth2/JWT for stateless authentication, API gateways for centralized security, service mesh for mTLS, secrets management for sensitive data, and rate limiting for DDoS protection. Each microservice should validate tokens, implement least privilege access, use secure communication channels, and log security events. Understanding microservices security is essential for building distributed systems that maintain security without compromising agility.`,
    code: null,
    table: null
  },
  175: {
    explanation: `Spring Bean lifecycle consists of several phases from instantiation to destruction. The lifecycle includes: 1) Instantiation (bean creation), 2) Population of properties (dependency injection), 3) BeanNameAware and BeanFactoryAware callbacks, 4) BeanPostProcessor pre-initialization, 5) InitializingBean and custom init-method, 6) BeanPostProcessor post-initialization, 7) Bean ready for use, 8) DisposableBean and custom destroy-method on shutdown. Understanding the bean lifecycle is crucial for customizing bean initialization and destruction logic, implementing cross-cutting concerns, and troubleshooting bean creation issues. Spring provides various callback interfaces and annotations for hooking into different lifecycle stages.`,
    code: null,
    table: `| Phase | Description | Callback Method |
|-------|-------------|----------------|
| Instantiation | Bean object created | Constructor |
| Property Population | Dependencies injected | @Autowired, setters |
| Aware Callbacks | Bean context awareness | setBeanName(), setBeanFactory() |
| Post-Process Before | Custom pre-init logic | BeanPostProcessor.postProcessBeforeInitialization() |
| Initialization | Init logic | @PostConstruct, InitializingBean.afterPropertiesSet() |
| Post-Process After | Custom post-init logic | BeanPostProcessor.postProcessAfterInitialization() |
| Ready for Use | Bean available for use | - |
| Destruction | Cleanup logic | @PreDestroy, DisposableBean.destroy() |`
  },
  176: {
    explanation: `Validating and reviewing code is a critical quality assurance process that involves systematic examination of code for correctness, efficiency, security, and maintainability. Code review practices include: checking for bugs and logic errors, ensuring adherence to coding standards, verifying security vulnerabilities, assessing performance implications, evaluating test coverage, and checking documentation. Tools like SonarQube automate many checks, but manual review is essential for context-specific issues. Best practices include: small, focused pull requests, clear review criteria, constructive feedback, and timely reviews. Understanding code review processes is essential for maintaining code quality and team productivity in software development.`,
    code: null,
    table: null
  },
  177: {
    explanation: `Common issues faced in SonarQube include code smells, bugs, vulnerabilities, and code duplications. Code smells indicate maintainability issues like long methods, complex classes, or duplicated code. Bugs represent potential errors like null pointer dereferences or resource leaks. Vulnerabilities identify security risks like SQL injection or weak encryption. Duplications highlight repeated code that should be refactored. Solutions include: refactoring complex methods, extracting common code, adding null checks, implementing proper resource management, using secure coding practices, and improving test coverage. Understanding SonarQube issues and their solutions is essential for maintaining code quality and security in development projects.`,
    code: null,
    table: null
  },
  178: {
    explanation: `Handling distributed transactions in microservices is challenging due to the lack of ACID guarantees across service boundaries. Approaches include: 1) Two-Phase Commit (2PC) - strong consistency but reduces availability, 2) Saga pattern - sequence of local transactions with compensating actions, 3) Eventual consistency - accepting temporary inconsistencies, 4) Outbox pattern - reliable event publishing, 5) TCC (Try-Confirm-Cancel) - three-phase commit. The Saga pattern is most common, using either choreography (events trigger next step) or orchestration (central coordinator). Understanding distributed transaction patterns is essential for building microservices that maintain data consistency while preserving autonomy and availability.`,
    code: null,
    table: null
  },
  179: {
    explanation: `The Saga design pattern manages distributed transactions by breaking them into a sequence of local transactions, each with a compensating transaction to undo changes if needed. Sagas can be choreography-based (events trigger next step) or orchestration-based (central coordinator coordinates steps). In choreography, each service publishes events that trigger the next service. In orchestration, a saga orchestrator manages the entire process. If a step fails, compensating transactions execute in reverse order to undo previous changes. Sagas provide eventual consistency rather than immediate consistency, making them suitable for microservices where availability and partition tolerance are prioritized over strong consistency. Understanding the Saga pattern is essential for managing complex business processes across multiple services.`,
    code: null,
    table: null
  },
  180: {
    explanation: `The Outbox pattern ensures reliable event publishing in distributed systems by storing events in an outbox table within the same transaction as the business data. A separate process polls the outbox table and publishes events to message brokers. This pattern guarantees that events are published exactly once and in order, even if the message broker is temporarily unavailable. The outbox table is part of the same database transaction, ensuring atomicity between data changes and event creation. A background worker or CDC (Change Data Capture) process reads from the outbox and publishes events. Understanding the Outbox pattern is essential for implementing reliable event-driven architectures and maintaining data consistency in distributed systems.`,
    code: null,
    table: null
  },
  181: {
    explanation: `Deciding between monolithic and microservices architecture depends on various factors: team size and expertise, application complexity, scalability requirements, deployment frequency, and organizational structure. Monolithic architecture is simpler for small teams, easier to develop initially, has lower operational overhead, and is suitable for applications with clear boundaries. Microservices offer independent scaling, fault isolation, technology diversity, and faster deployment cycles but add complexity in communication, data consistency, and operations. Consider microservices when: team is large enough to own services, domains are well-separated, independent scaling is needed, and rapid deployment is required. Choose monolithic when: team is small, application is simple, tight coupling is acceptable, and operational complexity must be minimized.`,
    code: null,
    table: null
  },
  182: {
    explanation: `An idempotent API is one that can be called multiple times with the same parameters and produce the same result without causing unintended side effects. Idempotency is crucial for reliable distributed systems where requests might be retried due to network failures. HTTP methods like GET, PUT, and DELETE are idempotent by design, while POST is not. To make POST idempotent, use idempotency keys (unique identifiers sent by clients) that the server tracks to detect duplicate requests. Implement idempotency by: storing request identifiers, checking for duplicates before processing, and returning cached results for repeated requests. Understanding idempotency is essential for building robust APIs that handle retries and network failures gracefully.`,
    code: null,
    table: null
  },
  183: {
    explanation: `Correlation IDs are unique identifiers that are passed through all components in a distributed system to track a request across multiple services. They enable tracing of requests as they flow through microservices, making it possible to debug issues, analyze performance, and understand the complete request lifecycle. Correlation IDs are typically generated at the entry point (API gateway) and propagated via HTTP headers, message metadata, or tracing contexts. They're essential for distributed tracing, logging aggregation, and monitoring. Tools like Zipkin, Jaeger, and AWS X-Ray use correlation IDs to build request traces. Understanding correlation IDs is crucial for observability in microservices architectures.`,
    code: null,
    table: null
  },
  184: {
    explanation: `Microservices communicate through synchronous and asynchronous patterns. Synchronous communication includes HTTP/REST (direct service-to-service calls), gRPC (high-performance RPC), and GraphQL (flexible data fetching). Asynchronous communication includes message brokers (Kafka, RabbitMQ), event buses, and message queues. Synchronous is simpler but creates tight coupling and blocking. Asynchronous provides loose coupling and better scalability but adds complexity with eventual consistency. Hybrid approaches are common: synchronous for request-response, asynchronous for events and notifications. Choosing the right communication pattern depends on requirements like latency, consistency, scalability, and complexity tolerance.`,
    code: null,
    table: null
  },
  185: {
    explanation: `Design patterns for large-scale enterprise applications include architectural patterns like Layered Architecture, Hexagonal Architecture (Ports and Adapters), Clean Architecture, and Microservices. Common patterns include: CQRS (Command Query Responsibility Segregation) for separating read/write operations, Event Sourcing for storing events instead of state, Saga for distributed transactions, Circuit Breaker for fault tolerance, Bulkhead for resource isolation, and Sidecar for cross-cutting concerns. These patterns address challenges like scalability, maintainability, testability, and resilience. Understanding enterprise design patterns is essential for architecting systems that can handle complex business requirements and scale effectively.`,
    code: null,
    table: null
  },
  186: {
    explanation: `API management tools in cloud services like AWS provide comprehensive solutions for managing APIs at scale. AWS API Gateway offers features like request/response transformation, authentication (Cognito, Lambda Authorizer), authorization (IAM policies), rate limiting, caching, monitoring (CloudWatch), and integration with various backend services. Other AWS services include: AppSync for GraphQL APIs, EventBridge for event-driven APIs, and PrivateLink for private API access. These tools simplify API management, provide security, enable monetization, and offer analytics. Understanding cloud API management is essential for building scalable, secure APIs in cloud environments.`,
    code: null,
    table: null
  },
  187: {
    explanation: `When API latency suddenly increases, systematic troubleshooting is required. Steps include: 1) Check monitoring dashboards for anomalies, 2) Analyze application metrics (CPU, memory, I/O), 3) Review database performance (slow queries, connection pool), 4) Check external dependencies (third-party APIs, message brokers), 5) Examine network issues (bandwidth, latency), 6) Review recent deployments or configuration changes, 7) Check for caching issues (cache misses, stampede), 8) Analyze logs for errors or warnings, 9) Implement temporary mitigations (circuit breakers, rate limiting), 10) Scale resources if needed. Understanding performance troubleshooting is crucial for maintaining service availability and user experience.`,
    code: null,
    table: null
  },
  188: {
    explanation: `Designing APIs to handle huge traffic requires multiple strategies: horizontal scaling (load balancers, auto-scaling), caching (CDN, application cache, database cache), rate limiting (prevent abuse), asynchronous processing (message queues), database optimization (read replicas, sharding), CDN for static content, connection pooling, and implementing circuit breakers. Architecture patterns include: API Gateway for routing, microservices for independent scaling, event-driven architecture for decoupling, and edge computing for reduced latency. Monitoring and auto-scaling are essential for handling traffic spikes. Understanding scalability patterns is crucial for building APIs that can handle growth and traffic surges.`,
    code: null,
    table: null
  },
  189: {
    explanation: `Architecting large-scale enterprise applications requires considering multiple design patterns and principles. Key patterns include: Layered Architecture (separation of concerns), Domain-Driven Design (bounded contexts), Microservices (independent deployable units), Event-Driven Architecture (loose coupling), CQRS (separate read/write models), Event Sourcing (event-based state), Saga (distributed transactions), and Circuit Breaker (fault tolerance). Principles include: SOLID principles, DRY (Don't Repeat Yourself), separation of concerns, and CAP theorem considerations. Understanding these patterns and principles is essential for designing systems that are maintainable, scalable, and aligned with business requirements.`,
    code: null,
    table: null
  },
  190: {
    explanation: `AWS API management tools include API Gateway for REST and WebSocket APIs, AppSync for GraphQL APIs, and EventBridge for event-driven APIs. API Gateway provides features like request/response transformation, authentication/authorization, rate limiting, caching, monitoring, and integration with Lambda, EC2, and other AWS services. It supports regional and edge-optimized endpoints for low latency. AppSync offers real-time subscriptions, offline capabilities, and integration with DynamoDB. EventBridge enables event-driven architectures with event buses and rules. These tools provide comprehensive API management capabilities including security, monitoring, and analytics. Understanding AWS API services is essential for building scalable APIs on AWS.`,
    code: null,
    table: null
  },
  191: {
    explanation: `Kafka partitions are fundamental units of parallelism and scalability in Apache Kafka. Each topic is divided into multiple partitions, allowing parallel consumption and providing ordering guarantees within each partition. Partitions enable: horizontal scaling across multiple brokers, parallel processing by consumer groups, ordered message delivery within partitions, and load distribution. Messages with the same key are routed to the same partition, maintaining order for related data. The number of partitions affects throughput, parallelism, and storage. Understanding partitions is crucial for designing Kafka topics that meet performance and ordering requirements.`,
    code: null,
    table: null
  },
  192: {
    explanation: `Implementing microservices in a project involves several considerations: service boundaries (based on business capabilities), communication patterns (REST, gRPC, message queues), data management (separate databases per service), deployment strategy (containers, Kubernetes), service discovery (Eureka, Consul), configuration management (Config Server, environment variables), monitoring (Prometheus, Grafana), logging (ELK stack), and security (OAuth2, mTLS). The implementation should follow principles like single responsibility, loose coupling, and independent deployability. Understanding microservices implementation is essential for transitioning from monolithic to distributed architectures.`,
    code: null,
    table: null
  },
  193: {
    explanation: `API Gateway in microservices serves as a single entry point for all client requests, handling cross-cutting concerns like authentication, authorization, rate limiting, load balancing, caching, and request routing. It abstracts backend service complexity, provides unified API interface, enables versioning, and supports protocol translation (HTTP to gRPC). API Gateway also handles request/response transformation, aggregation of multiple service calls, and circuit breaking. Popular implementations include Spring Cloud Gateway, Netflix Zuul, Kong, and AWS API Gateway. Understanding API Gateway is essential for building microservices with centralized API management and improved client experience.`,
    code: null,
    table: null
  },
  194: {
    explanation: `Handling service downtime when called by another service requires fault tolerance patterns. Approaches include: Circuit Breaker (stop calling failing service), Retry with exponential backoff, Fallback (provide alternative response), Timeout (prevent hanging), Bulkhead (resource isolation), and Dead Letter Queue (for message systems). Implement health checks to detect failures, use load balancing for redundancy, and implement graceful degradation. Monitoring and alerting are crucial for quick detection and response. Understanding fault tolerance patterns is essential for building resilient microservices that can handle service failures gracefully.`,
    code: null,
    table: null
  },
  195: {
    explanation: `Identifying failing services when multiple microservices are called requires distributed tracing and observability. Implement correlation IDs to track requests across services, use distributed tracing tools (Zipkin, Jaeger, AWS X-Ray) to visualize request flows, add structured logging with request context, implement health checks and metrics, and set up alerts for error rates. Use API Gateway logs to trace request paths, implement circuit breakers to isolate failures, and use service mesh for enhanced observability. Understanding distributed tracing is essential for debugging complex microservices interactions and identifying root causes of failures.`,
    code: null,
    table: null
  },
  196: {
    explanation: `Managing latency in microservices involves multiple strategies: optimizing service-to-service communication (using gRPC instead of REST), implementing caching at multiple levels (application, CDN, database), using asynchronous processing (message queues), optimizing database queries (indexes, read replicas), implementing connection pooling, using CDN for static content, and optimizing serialization (Protocol Buffers instead of JSON). Monitor latency with distributed tracing, identify bottlenecks, and implement performance optimizations. Understanding latency management is crucial for maintaining responsive microservices architectures.`,
    code: null,
    table: null
  },
  197: {
    explanation: `Anti-patterns in microservices are common mistakes that can lead to increased complexity and reduced benefits. Common anti-patterns include: Distributed Monolith (services too coupled), Shared Database (breaking autonomy), Synchronous Communication (creating tight coupling), Lack of Service Boundaries (poor separation), Ignoring Data Consistency (no eventual consistency strategy), No Monitoring (blind to issues), and Over-engineering (unnecessary complexity). Avoid these by: defining clear service boundaries, using asynchronous communication, implementing proper data management, adding observability, and starting simple. Understanding anti-patterns is crucial for avoiding common pitfalls in microservices architecture.`,
    code: null,
    table: null
  },
  198: {
    explanation: `API monitoring tools provide visibility into API performance, availability, and usage. Popular tools include: Prometheus (metrics collection), Grafana (visualization), New Relic (APM), Datadog (monitoring), AWS CloudWatch (AWS services), and Postman (API testing). These tools track metrics like request rate, response time, error rate, latency percentiles, and resource utilization. They provide dashboards, alerts, and historical analysis. Understanding API monitoring is essential for maintaining API health, performance, and reliability in production environments.`,
    code: null,
    table: null
  },
  199: {
    explanation: `Achieving data consistency among multiple services in distributed systems is challenging due to the CAP theorem constraints. Approaches include: Strong consistency (2PC, but reduces availability), Eventual consistency (accept temporary inconsistencies), Saga pattern (compensating transactions), Event Sourcing (event-based state), CQRS (separate read/write models), and consensus algorithms (Raft, Paxos). Choose based on requirements: strong consistency for financial transactions, eventual consistency for social media feeds. Implement idempotency for retries, use message brokers for reliable communication, and implement conflict resolution strategies. Understanding data consistency patterns is essential for building reliable distributed systems.`,
    code: null,
    table: null
  },
  200: {
    explanation: `Designing high-throughput APIs requires optimizing every layer of the stack. Strategies include: horizontal scaling (load balancers, auto-scaling), caching (CDN, Redis, application cache), database optimization (read replicas, sharding, connection pooling), asynchronous processing (message queues), efficient serialization (Protocol Buffers, Avro), CDN for static content, and implementing rate limiting. Architecture patterns include: API Gateway for routing, microservices for independent scaling, event-driven architecture for decoupling, and edge computing for reduced latency. Use connection pooling, keep-alive connections, and HTTP/2 for improved network efficiency. Monitor performance metrics and optimize bottlenecks. Understanding high-throughput design is crucial for building APIs that can handle massive scale.`,
    code: null,
    table: null
  }
};
