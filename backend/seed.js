const mongoose = require('mongoose');
const Passage = require('./models/Passage');
require('dotenv').config();

// The original paragraphs data
const paragraphs = [
    {
        id: 1,
        text: "the quick brown fox jumps over the lazy dog near the river bank",
        difficulty: "easy", category: "general", duration: 15
    },
    {
        id: 2,
        text: "cats and dogs are common pets that many families love to keep at home",
        difficulty: "easy", category: "general", duration: 15
    },
    {
        id: 3,
        text: "the sun rises in the east and sets in the west every single day of the year",
        difficulty: "easy", category: "general", duration: 15
    },
    {
        id: 4,
        text: "she sells seashells by the seashore and the shells she sells are surely seashells",
        difficulty: "easy", category: "general", duration: 30
    },
    {
        id: 5,
        text: "a good book is a treasure trove of knowledge wisdom and adventure waiting to be discovered by anyone who opens its pages with curiosity",
        difficulty: "easy", category: "general", duration: 30
    },
    {
        id: 6,
        text: "the best way to improve your typing speed is to practice every single day without exception and to focus on accuracy before speed because proper muscle memory built on correct finger placement will always serve you better than rushing through exercises with bad habits",
        difficulty: "easy", category: "general", duration: 60
    },
    {
        id: 7,
        text: "learning to type fast is a skill that takes time and patience but it is one of the most useful things you can ever learn in the modern world where almost everything we do requires a keyboard whether you are writing emails sending messages coding software or creating documents the ability to type quickly and accurately saves you an enormous amount of time every single day of your life",
        difficulty: "easy", category: "general", duration: 120
    },
    {
        id: 8,
        text: "velocity increases exponentially when consistent practice replaces hesitation",
        difficulty: "medium", category: "general", duration: 15
    },
    {
        id: 9,
        text: "programming languages evolve rapidly as developers demand more expressive tools for building modern applications",
        difficulty: "medium", category: "general", duration: 30
    },
    {
        id: 10,
        text: "a user interface is like a joke. If you have to explain it, it is not that good. Design should be intuitive enough that anyone can understand it immediately without any manual or tutorial",
        difficulty: "medium", category: "general", duration: 60
    },
    {
        id: 11,
        text: "technology is neither good nor bad in itself but the manner in which we choose to use it determines whether it enriches or diminishes our lives. The invention of the internet connected billions of people across the globe creating unprecedented opportunities for communication collaboration commerce and creativity. Yet it also introduced new challenges around privacy misinformation and addiction that society is still struggling to address effectively in the modern era of smartphones and social media platforms",
        difficulty: "medium", category: "general", duration: 120
    },
    {
        id: 12,
        text: "asynchronous paradigms necessitate meticulous orchestration",
        difficulty: "hard", category: "general", duration: 15
    },
    {
        id: 13,
        text: "cryptographic algorithms ensure data integrity through mathematical transformations that are computationally infeasible to reverse without the correct key",
        difficulty: "hard", category: "general", duration: 30
    },
    {
        id: 14,
        text: "the proliferation of microservices architectures has fundamentally transformed enterprise software development by decomposing monolithic applications into independently deployable services that communicate via well-defined APIs enabling teams to develop release and scale their components autonomously",
        difficulty: "hard", category: "general", duration: 60
    },
    {
        id: 15,
        text: "the epistemological underpinnings of artificial intelligence necessitate an interdisciplinary examination encompassing computational linguistics cognitive psychology probabilistic reasoning and distributed systems theory. Contemporary large language models demonstrate remarkable emergent capabilities that transcend their explicit training objectives suggesting that sufficiently parameterized neural architectures develop internal representations that approximate genuine semantic understanding rather than mere statistical pattern interpolation across the token distribution manifold",
        difficulty: "hard", category: "general", duration: 120
    },
    {
        id: 20,
        text: "it always seems impossible until it is done",
        difficulty: "easy", category: "quotes", duration: 15
    },
    {
        id: 21,
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        difficulty: "easy", category: "quotes", duration: 30
    },
    {
        id: 22,
        text: "In the end, it's not the years in your life that count. It's the life in your years. Make every moment matter and live with no regrets.",
        difficulty: "easy", category: "quotes", duration: 60
    },
    {
        id: 23,
        text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment of all. Stay true to who you are regardless of what others expect.",
        difficulty: "medium", category: "quotes", duration: 60
    },
    {
        id: 24,
        text: "There are only two hard things in Computer Science: cache invalidation and naming things. Every developer who has spent hours debating variable names knows this truth intimately.",
        difficulty: "medium", category: "quotes", duration: 60
    },
    {
        id: 25,
        text: "The measure of intelligence is the ability to change. Growth requires you to abandon comfort zones repeatedly and embrace uncertainty with curiosity rather than fear.",
        difficulty: "medium", category: "quotes", duration: 60
    },
    {
        id: 26,
        text: "Any sufficiently advanced technology is indistinguishable from magic. We live in an era where the devices in our pockets perform billions of calculations per second yet we treat them as mundane objects we scroll through while waiting for coffee.",
        difficulty: "hard", category: "quotes", duration: 120
    },
    {
        id: 30,
        text: "const add = (a, b) => a + b;",
        difficulty: "easy", category: "code", language: "javascript", duration: 15,
        explanation: "This is an arrow function that takes two numbers and returns their sum. Arrow functions are a shorter way to write functions in modern JavaScript."
    },
    {
        id: 31,
        text: "const greet = (name) => `Hello, ${name}! Welcome back.`;",
        difficulty: "easy", category: "code", language: "javascript", duration: 15,
        explanation: "This arrow function uses a template literal (backtick string) to embed a variable inside a string. The ${name} syntax inserts the value of name into the output."
    },
    {
        id: 32,
        text: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]",
        difficulty: "medium", category: "code", language: "javascript", duration: 30,
        explanation: "Array.map() creates a new array by applying a function to each element. Here we multiply every number by 2. The original array is not changed."
    },
    {
        id: 33,
        text: "const calculateWPM = (chars, timeSeconds) => {\n    const minutes = timeSeconds / 60;\n    return Math.round((chars / 5) / minutes);\n};",
        difficulty: "medium", category: "code", language: "javascript", duration: 30,
        explanation: "This function calculates Words Per Minute (WPM). The standard definition of a 'word' in typing tests is 5 characters. We divide total characters by 5 to get words, then divide by minutes."
    },
    {
        id: 34,
        text: "async function fetchUser(id) {\n    try {\n        const response = await fetch(`/api/users/${id}`);\n        const data = await response.json();\n        return data;\n    } catch (error) {\n        console.error('Failed to fetch user:', error);\n    }\n}",
        difficulty: "hard", category: "code", language: "javascript", duration: 60,
        explanation: "This async function fetches a user from an API. The await keyword pauses execution until the fetch completes. The try/catch block handles errors gracefully so the app doesn't crash."
    },
    {
        id: 35,
        text: "function debounce(func, delay) {\n    let timer;\n    return function(...args) {\n        clearTimeout(timer);\n        timer = setTimeout(() => func.apply(this, args), delay);\n    };\n}",
        difficulty: "hard", category: "code", language: "javascript", duration: 60,
        explanation: "A debounce function delays executing a function until after a user stops triggering it. It's commonly used for search inputs — you don't want to fire an API call on every single keypress."
    },
    {
        id: 40,
        text: "def greet(name):\n    return f\"Hello, {name}!\"",
        difficulty: "easy", category: "code", language: "python", duration: 15,
        explanation: "A Python function that uses an f-string to embed a variable in a string. F-strings (formatted string literals) are the modern way to build strings in Python 3.6+."
    },
    {
        id: 41,
        text: "numbers = [1, 2, 3, 4, 5]\nsquares = [x ** 2 for x in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]",
        difficulty: "easy", category: "code", language: "python", duration: 30,
        explanation: "A list comprehension creates a new list by applying an expression to each item. Here we square each number. It's a concise and Pythonic alternative to a for loop."
    },
    {
        id: 42,
        text: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)",
        difficulty: "medium", category: "code", language: "python", duration: 30,
        explanation: "This recursive function calculates the nth Fibonacci number. Each number is the sum of the two before it (0, 1, 1, 2, 3, 5...). The base cases (n <= 1) stop the recursion."
    },
    {
        id: 43,
        text: "class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        return self.items.pop() if self.items else None",
        difficulty: "hard", category: "code", language: "python", duration: 60,
        explanation: "A Stack is a Last-In-First-Out (LIFO) data structure. This class implements push (add to top) and pop (remove from top). Think of it like a stack of plates."
    },
    {
        id: 44,
        text: "import asyncio\n\nasync def fetch_data(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as response:\n            return await response.json()",
        difficulty: "hard", category: "code", language: "python", duration: 60,
        explanation: "Python's async/await syntax enables non-blocking I/O. The async with statement manages async context managers. aiohttp is Python's async HTTP library for making non-blocking API calls."
    },
    {
        id: 50,
        text: "public int add(int a, int b) {\n    return a + b;\n}",
        difficulty: "easy", category: "code", language: "java", duration: 15,
        explanation: "A basic Java method that adds two integers. Java requires you to declare the type of each parameter (int) and the return type (int) before the method body."
    },
    {
        id: 51,
        text: "String[] fruits = {\"apple\", \"banana\", \"cherry\"};\nfor (String fruit : fruits) {\n    System.out.println(fruit);\n}",
        difficulty: "easy", category: "code", language: "java", duration: 30,
        explanation: "An enhanced for-each loop in Java. It iterates over each element in the array without needing an index counter. This is cleaner than a traditional for(int i=0; i<n; i++) loop."
    },
    {
        id: 52,
        text: "public class Animal {\n    private String name;\n    public Animal(String name) { this.name = name; }\n    public String getName() { return name; }\n}\npublic class Dog extends Animal {\n    public void bark() { System.out.println(getName() + \" says Woof!\"); }\n}",
        difficulty: "medium", category: "code", language: "java", duration: 60,
        explanation: "This shows Java inheritance. Dog extends Animal, meaning Dog inherits all of Animal's properties and methods. The extends keyword establishes the parent-child relationship between classes."
    },
    {
        id: 53,
        text: "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\nList<Integer> numbers = new ArrayList<>(List.of(1,2,3,4,5,6));\nList<Integer> evens = numbers.stream()\n    .filter(n -> n % 2 == 0)\n    .collect(Collectors.toList());",
        difficulty: "hard", category: "code", language: "java", duration: 60,
        explanation: "Java Streams API allows functional-style operations on collections. filter() keeps only elements matching a condition (even numbers), and collect() gathers the results into a new List."
    },
    {
        id: 60,
        text: "#include <iostream>\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
        difficulty: "easy", category: "code", language: "cpp", duration: 30,
        explanation: "The classic C++ Hello World program. #include imports the iostream library for input/output. std::cout is the standard output stream, and std::endl adds a newline and flushes the buffer."
    },
    {
        id: 61,
        text: "int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}",
        difficulty: "medium", category: "code", language: "cpp", duration: 30,
        explanation: "A recursive C++ function for factorial. factorial(5) = 5 * 4 * 3 * 2 * 1 = 120. The base case (n <= 1 returns 1) prevents infinite recursion."
    },
    {
        id: 62,
        text: "#include <vector>\n#include <algorithm>\n\nstd::vector<int> nums = {5, 2, 8, 1, 9};\nstd::sort(nums.begin(), nums.end());\n// nums is now {1, 2, 5, 8, 9}",
        difficulty: "medium", category: "code", language: "cpp", duration: 60,
        explanation: "C++ vectors are dynamic arrays. std::sort() from the <algorithm> header sorts elements in-place. begin() and end() are iterators pointing to the first and past-the-last elements."
    },
    {
        id: 63,
        text: "template <typename T>\nclass Stack {\nprivate:\n    std::vector<T> data;\npublic:\n    void push(T val) { data.push_back(val); }\n    T pop() { T val = data.back(); data.pop_back(); return val; }\n    bool empty() const { return data.empty(); }\n};",
        difficulty: "hard", category: "code", language: "cpp", duration: 60,
        explanation: "A C++ template class lets you write a single Stack that works with any data type (int, string, etc.). The <typename T> makes T a placeholder type filled in at compile time."
    }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/typecat';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB for seeding');
        
        await Passage.deleteMany({});
        console.log('Cleared existing passages');

        const docs = paragraphs.map(p => {
            // Double the text
            const separator = p.category === 'code' ? '\n' : ' ';
            const doubledText = p.text + separator + p.text;
            
            return {
                text: doubledText,
                difficulty: p.difficulty,
                category: p.category,
                language: p.language,
                duration: p.duration,
                explanation: p.explanation
            };
        });

        await Passage.insertMany(docs);
        console.log(`✅ Seeded ${docs.length} passages (with doubled text)`);
        
        process.exit(0);
    })
    .catch(err => {
        console.error('Seeding failed:', err);
        process.exit(1);
    });
