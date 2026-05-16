import React, { useState, useEffect } from 'react';
import '../styles/JavaCodeAnimation.css';

const javaCode = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Create a simple object
        Person person = new Person("Abhay");
        person.greet();
        
        // Using Stream API
        List<String> names = Arrays.asList("Java", "Spring", "React");
        names.stream()
             .filter(name -> name.length() > 4)
             .forEach(System.out::println);
    }
}

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public void greet() {
        System.out.println("Hello, " + name + "!");
    }
}`;

export default function JavaCodeAnimation() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [phase, setPhase] = useState('typing'); // typing, compiling, running
  const [output, setOutput] = useState('');

  useEffect(() => {
    let charIndex = 0;
    let outputIndex = 0;

    if (phase === 'typing') {
      const typingInterval = setInterval(() => {
        if (charIndex < javaCode.length) {
          setDisplayedCode((prev) => prev + javaCode[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setPhase('compiling');
          setTimeout(() => setPhase('running'), 1500);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    } else if (phase === 'running') {
      const runOutput = [
        'Compiling...',
        'Build Success!',
        'Running HelloWorld...',
        'Hello, World!',
        'Hello, Abhay!',
        'Spring',
        'Program exited with code 0'
      ];

      const outputInterval = setInterval(() => {
        if (outputIndex < runOutput.length) {
          setOutput((prev) => prev + runOutput[outputIndex] + '\n');
          outputIndex++;
        } else {
          clearInterval(outputInterval);
          // Reset after a delay
          setTimeout(() => {
            setDisplayedCode('');
            setOutput('');
            setPhase('typing');
          }, 3000);
        }
      }, 500);

      return () => clearInterval(outputInterval);
    }
  }, [phase]);

  return (
    <div className="code-animation-container">
      <div className="code-window">
        <div className="code-window-header">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">HelloWorld.java</span>
        </div>
        <div className="code-content">
          <pre className="code-text">
            <code>{displayedCode}</code>
            <span className="cursor">|</span>
          </pre>
        </div>
      </div>
      {phase === 'running' && (
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-title">Terminal</span>
          </div>
          <div className="terminal-content">
            <pre className="terminal-text">{output}</pre>
          </div>
        </div>
      )}
      <div className="phase-indicator">
        <span className={`phase ${phase === 'typing' ? 'active' : ''}`}>Typing</span>
        <span className={`phase ${phase === 'compiling' ? 'active' : ''}`}>Compiling</span>
        <span className={`phase ${phase === 'running' ? 'active' : ''}`}>Running</span>
      </div>
    </div>
  );
}
