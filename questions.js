// All 34 Java Quiz Questions
const allQuestions = [
    // Level 1: Basics (Questions 1-5)
    {
        id: 1,
        level: 1,
        question: "What is the correct way to declare a variable in Java?",
        options: ["int 1x = 10", "int x = 10", "integer x = 10", "var int x = 10"],
        correct: 1,
        explanation: "Variable names in Java must start with a letter, underscore, or dollar sign (not a number). 'int x = 10' is the correct syntax."
    },
    {
        id: 2,
        level: 1,
        question: "Which of the following is a valid Java keyword?",
        options: ["define", "include", "class", "function"],
        correct: 2,
        explanation: "'class' is a valid Java keyword used to define a class. 'define', 'include', and 'function' are not Java keywords."
    },
    {
        id: 3,
        level: 1,
        question: "Java is a:",
        options: ["Low-level language", "Machine language", "High-level language", "Assembly language"],
        correct: 2,
        explanation: "Java is a high-level language that is human-readable and platform-independent, compiled to bytecode and executed on the JVM."
    },
    {
        id: 4,
        level: 1,
        question: "Which method is the entry point of a Java program?",
        options: ["start()", "main()", "run()", "begin()"],
        correct: 1,
        explanation: "The main() method is the entry point of any Java application. It must be public, static, and void."
    },
    {
        id: 5,
        level: 1,
        question: "Which of the following is used to print output in Java?",
        options: ["print.out()", "System.out.println()", "console.log()", "echo()"],
        correct: 1,
        explanation: "System.out.println() is used to print output to the console in Java. It includes a newline at the end."
    },

    // Level 2: Data Types & Operators (Questions 6-10)
    {
        id: 6,
        level: 2,
        question: "Which data type is used to store decimal values?",
        options: ["int", "float", "char", "boolean"],
        correct: 1,
        explanation: "The 'float' data type is used for decimal values. 'int' is for integers, 'char' for characters, and 'boolean' for true/false."
    },
    {
        id: 7,
        level: 2,
        question: "What is the size of int in Java?",
        options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"],
        correct: 1,
        explanation: "The 'int' data type in Java is 4 bytes (32 bits). 'long' is 8 bytes, 'short' is 2 bytes, and 'byte' is 1 byte."
    },
    {
        id: 8,
        level: 2,
        question: "Which operator is used for comparison?",
        options: ["=", "==", ":=", "!="],
        correct: 1,
        explanation: "'==' is the comparison operator that checks if two values are equal. '=' is assignment, ':=' doesn't exist in Java, and '!=' checks inequality."
    },
    {
        id: 9,
        level: 2,
        question: "What does % operator do?",
        options: ["Multiplication", "Division", "Remainder", "Addition"],
        correct: 2,
        explanation: "The '%' operator returns the remainder of a division. For example, 10 % 3 = 1."
    },
    {
        id: 10,
        level: 2,
        question: "Which of the following is NOT a primitive type?",
        options: ["int", "boolean", "String", "char"],
        correct: 2,
        explanation: "'String' is a non-primitive (reference) type in Java. 'int', 'boolean', and 'char' are primitive types."
    },

    // Level 3: Control Statements (Questions 11-15)
    {
        id: 11,
        level: 3,
        question: "Which keyword is used for decision making?",
        options: ["loop", "if", "switch-case", "both B and C"],
        correct: 3,
        explanation: "Both 'if' and 'switch-case' are used for decision making in Java. 'if' for conditional logic and 'switch-case' for multiple choices."
    },
    {
        id: 12,
        level: 3,
        question: "Which loop runs at least once?",
        options: ["for loop", "while loop", "do-while loop", "none"],
        correct: 2,
        explanation: "The 'do-while' loop runs at least once because the condition is checked after the body executes."
    },
    {
        id: 13,
        level: 3,
        question: "What is used to exit a loop?",
        options: ["stop", "break", "exit", "return only"],
        correct: 1,
        explanation: "The 'break' keyword is used to exit a loop prematurely. It immediately terminates the loop."
    },
    {
        id: 14,
        level: 3,
        question: "Which statement is used for multiple choices?",
        options: ["if", "switch", "loop", "try"],
        correct: 1,
        explanation: "The 'switch' statement is used to execute different code blocks for multiple choices/cases."
    },
    {
        id: 15,
        level: 3,
        question: "Which loop is best when number of iterations is known?",
        options: ["while", "do-while", "for", "if"],
        correct: 2,
        explanation: "The 'for' loop is best when the number of iterations is known because it clearly defines the starting point, condition, and increment."
    },

    // Level 4: Arrays (Questions 16-20)
    {
        id: 16,
        level: 4,
        question: "Array index starts from:",
        options: ["1", "-1", "0", "2"],
        correct: 2,
        explanation: "Array indexing in Java starts from 0. The first element is at index 0, the second at index 1, and so on."
    },
    {
        id: 17,
        level: 4,
        question: "Which is correct array declaration?",
        options: ["int arr[] = new int[5];", "int arr = new int[5];", "array int arr[5];", "int arr(5);"],
        correct: 0,
        explanation: "'int arr[] = new int[5];' is the correct way to declare and initialize an array of 5 integers."
    },
    {
        id: 18,
        level: 4,
        question: "Arrays in Java are:",
        options: ["Fixed size", "Dynamic size", "Infinite size", "None"],
        correct: 0,
        explanation: "Arrays in Java are fixed-size. Once created, their size cannot be changed. Use ArrayList for dynamic size."
    },
    {
        id: 19,
        level: 4,
        question: "Which loop is commonly used for arrays?",
        options: ["for-each loop", "do loop", "if loop", "switch loop"],
        correct: 0,
        explanation: "The 'for-each' loop (enhanced for loop) is commonly used for arrays to iterate through all elements easily."
    },
    {
        id: 20,
        level: 4,
        question: "What does arr.length give?",
        options: ["First element", "Last element", "Size of array", "Index value"],
        correct: 2,
        explanation: "'arr.length' gives the size of the array, i.e., the number of elements in it."
    },

    // Level 5: Methods (Questions 21-25)
    {
        id: 21,
        level: 5,
        question: "A method in Java is:",
        options: ["A variable", "A class", "A block of code", "A package"],
        correct: 2,
        explanation: "A method is a block of code that performs a specific task. It can take parameters and return a value."
    },
    {
        id: 22,
        level: 5,
        question: "Which keyword is used to return a value?",
        options: ["break", "return", "exit", "yield"],
        correct: 1,
        explanation: "The 'return' keyword is used to return a value from a method and exit the method."
    },
    {
        id: 23,
        level: 5,
        question: "Method overloading means:",
        options: ["Same name, different parameters", "Same name, same parameters", "Different name, same parameters", "No methods"],
        correct: 0,
        explanation: "Method overloading allows multiple methods with the same name but different parameters (different type, number, or order)."
    },
    {
        id: 24,
        level: 5,
        question: "A method without return type uses:",
        options: ["int", "void", "null", "empty"],
        correct: 1,
        explanation: "The 'void' keyword is used for methods that don't return any value."
    },
    {
        id: 25,
        level: 5,
        question: "Methods help in:",
        options: ["Code duplication", "Reusability", "Slowing program", "Errors"],
        correct: 1,
        explanation: "Methods promote code reusability by allowing the same code to be used multiple times without rewriting it."
    },

    // Level 6: OOP (Questions 26-30)
    {
        id: 26,
        level: 6,
        question: "Object is:",
        options: ["Blueprint", "Instance of class", "Keyword", "Loop"],
        correct: 1,
        explanation: "An object is an instance of a class. It has specific values for the attributes defined in the class."
    },
    {
        id: 27,
        level: 6,
        question: "Class is:",
        options: ["Object", "Blueprint of object", "Method", "Variable"],
        correct: 1,
        explanation: "A class is a blueprint that defines the structure and behavior of objects. Objects are created from classes."
    },
    {
        id: 28,
        level: 6,
        question: "Which is NOT OOP principle?",
        options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
        correct: 2,
        explanation: "The four main OOP principles are Encapsulation, Inheritance, Polymorphism, and Abstraction. 'Compilation' is not an OOP principle."
    },
    {
        id: 29,
        level: 6,
        question: "Inheritance means:",
        options: ["Copying code", "One class acquires properties of another", "Deleting class", "Running loop"],
        correct: 1,
        explanation: "Inheritance allows a class to inherit properties and methods from another class, promoting code reuse."
    },
    {
        id: 30,
        level: 6,
        question: "Constructor is used to:",
        options: ["Delete object", "Initialize object", "Loop program", "Compile code"],
        correct: 1,
        explanation: "A constructor is used to initialize an object when it is created. It has the same name as the class."
    },

    // Bonus: Exam + Interview Level (Questions 31-34)
    {
        id: 31,
        level: 7,
        question: "Java is platform:",
        options: ["Dependent", "Independent", "Hardware based", "None"],
        correct: 1,
        explanation: "Java is platform-independent due to the JVM (Java Virtual Machine). Write once, run anywhere (WORA)."
    },
    {
        id: 32,
        level: 7,
        question: "JVM stands for:",
        options: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Model", "Joint Virtual Module"],
        correct: 1,
        explanation: "JVM stands for Java Virtual Machine. It's an abstract computing machine that enables a computer to run Java programs."
    },
    {
        id: 33,
        level: 7,
        question: "Which is NOT a loop?",
        options: ["for", "while", "repeat", "do-while"],
        correct: 2,
        explanation: "'repeat' is not a loop construct in Java. The main loops are 'for', 'while', and 'do-while'."
    },
    {
        id: 34,
        level: 7,
        question: "String in Java is:",
        options: ["Primitive type", "Object", "Loop", "Operator"],
        correct: 1,
        explanation: "String is a non-primitive (reference) type in Java. It's an object that represents a sequence of characters."
    }
];

// Function to get random questions
function getRandomQuestions(count = 34) {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Function to get a question by ID
function getQuestionById(id) {
    return allQuestions.find(q => q.id === id);
}
