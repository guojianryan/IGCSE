const sim = (slug, title, text) => ({
  href: `https://guojianryan.github.io/CompSimu/simulations/${slug}/index.html`,
  title,
  text,
});

const paper = "Paper 2 · Algorithms, programming and logic";
const chapter = "7 Algorithm design and problem-solving";

export const chapter7 = {
  "7.1": {
    id: "7.1",
    file: "7-1-life-cycle.html",
    title: "Program development life cycle",
    paper,
    chapter,
    lede: "The life cycle in this course has four stages: analysis, design, coding and testing. A question often gives you a task and asks which stage it belongs to. Name the stage, then say the task that makes it that stage.",
    mapTitle: "Four stages, and the task inside each one",
    map: [
      ["#stages", "7.1", "The four stages", "Analysis, design, coding and testing. Nothing else is a stage here."],
      ["#tasks", "7.1", "Match the task", "Abstraction and requirements are analysis. A plan is design. Writing code is coding."],
    ],
    sections: [
      {
        id: "stages",
        kicker: "7.1",
        nav: "Stages",
        title: "Analysis, design, coding and testing",
        lede: "The life cycle is limited to these four stages. Naming the stage without the task is only half an answer.",
        prose: [
          "Analysis identifies the problem and the requirements. It uses abstraction, which means ignoring detail that does not affect the solution, and decomposition, which means breaking the problem into parts.",
          "Design plans the solution before any code is written. The plan can be a structure diagram, a flowchart or pseudocode. Coding is writing the program and testing it as you go, which is iterative testing. Testing, as its own stage, runs the finished program with test data chosen to show whether it meets the requirements.",
        ],
        pair: {
          able: ["Understand the program development life cycle, limited to analysis, design, coding and testing."],
          notes: [
            "Analysis: abstraction, decomposition, identification of the problem and the requirements.",
            "Design: decomposition, structure diagrams, flowcharts, pseudocode.",
            "Coding: writing program code and iterative testing.",
            "Testing: testing program code with test data.",
          ],
        },
        exam: "Evaluation, documentation and maintenance are not stages in this syllabus. If a task is reviewing whether the finished system is a success, it is still not one of the four.",
      },
      {
        id: "tasks",
        kicker: "7.1",
        nav: "Tasks",
        title: "Which task belongs to which stage",
        lede: "Look at the verb. Finding out what is needed is analysis. Planning is design. Writing and trying each part is coding. Running chosen data on the finished program is testing.",
        table: {
          title: "A library program, one task at a time",
          head: ["Task", "Stage", "Why"],
          rows: [
            ["Interview the librarian about what the loans screen must show", "Analysis", "The requirements are being identified"],
            ["Ignore the colour of the carpet in the library", "Analysis", "That detail cannot change the solution. This is abstraction"],
            ["Draw a structure diagram of membership, loans and returns", "Design", "The solution is being planned, not written"],
            ["Write the loan procedure and run it before writing the next one", "Coding", "Code is being written, and the testing during writing is iterative"],
            ["Enter a member number that does not exist, after the program is finished", "Testing", "Chosen test data is being used on the program"],
          ],
          note: "The same word “testing” appears twice in the course. Testing while you write is part of coding. Testing with a planned set of data, once the program exists, is the testing stage.",
        },
      },
    ],
    order: {
      title: "Order the program development life cycle",
      done: "Analysis, then design, then coding, then testing.",
      steps: [
        "Analysis: identify the problem, the requirements, and break it down.",
        "Design: plan the solution with a structure diagram, flowchart or pseudocode.",
        "Coding: write the program and test it while writing.",
        "Testing: run the program with test data.",
      ],
    },
    mcqs: [
      { q: "A student interviews the club secretary to find out what a ranking program must show. Which stage is that?", options: ["Analysis", "Design", "Coding", "Testing"], answer: 0, why: "Finding out the requirements is analysis. Drawing the plan would be design." },
      { q: "Drawing a flowchart to put race times in order belongs to which stage?", options: ["Analysis", "Design", "Coding", "Testing"], answer: 1, why: "A flowchart is a plan of the solution. Planning is design." },
      { q: "Writing the program in Python and running each part as soon as it is finished is which stage?", options: ["Analysis", "Design", "Coding", "Testing"], answer: 2, why: "Writing the code is coding. The runs during writing are iterative testing, which the syllabus places inside coding." },
      { q: "The finished program is given the times 00:00 and 99:59 to see if they are rejected. Which stage is that?", options: ["Analysis", "Design", "Coding", "Testing"], answer: 3, why: "The program already exists. Chosen data is being used to see if it meets the requirements. That is the testing stage." },
      { q: "Which of these is a stage of the life cycle in this syllabus?", options: ["Evaluation", "Documentation", "Design", "Maintenance"], answer: 2, why: "The four stages are analysis, design, coding and testing. The other three names are not stages here." },
    ],
    checks: [
      "I can name the four stages: analysis, design, coding and testing.",
      "I can say what analysis uses: abstraction, decomposition, and the problem and requirements.",
      "I can tell iterative testing during coding from the testing stage.",
      "I can match a described task to the right stage.",
    ],
  },
  "7.2": {
    id: "7.2",
    file: "7-2-decomposition.html",
    title: "Decomposition and structure diagrams",
    paper,
    chapter,
    lede: "A system is made of sub-systems, and those are made of further sub-systems. Decomposition names the parts. A structure diagram draws that breakdown. A flowchart and pseudocode come later, when you show the order of the steps.",
    mapTitle: "The parts, then the diagram",
    map: [
      ["#parts", "7.2", "Component parts", "Inputs, processes, outputs and storage."],
      ["#structure", "7.2", "Structure diagram", "One box at the top. Lines down to the sub-systems. No arrowheads."],
      ["#design", "7.2", "Three design methods", "A structure diagram, a flowchart, or pseudocode. Each shows something different."],
    ],
    sections: [
      {
        id: "parts",
        kicker: "7.2",
        nav: "Parts",
        title: "Sub-systems and the parts of a problem",
        lede: "You stop when a part can be described clearly. For each part, be ready to name an input, a process, an output and the storage.",
        prose: [
          "A school library system might break into membership, loans and returns. Loans might break into checking the member, checking the book, and recording the loan. Those smaller parts are still sub-systems of loans.",
          "An input is data that goes in, such as the member number typed at the desk. A process is what is done to that data, such as checking that the member is allowed to borrow. An output is what comes out, such as the receipt. Storage is data kept for later, such as the record of the loan. A question that asks for the component parts wants these four, with an example of each from the system in the question.",
        ],
        pair: {
          able: [
            "Understand that every computer system is made of sub-systems, which are made of further sub-systems.",
            "Decompose a problem into its component parts.",
            "Use structure diagrams, flowcharts and pseudocode to design a solution.",
          ],
          notes: [
            "Include inputs, processes, outputs and storage.",
            "Include structure diagrams, flowcharts and pseudocode.",
          ],
        },
      },
      {
        id: "structure",
        kicker: "7.2",
        nav: "Structure",
        title: "A structure diagram",
        lede: "A structure diagram is the hierarchy. The whole system is the single box at the top. A line joins it to the sub-systems that make it up, and those can split again. It names the parts. It does not show the order they run in.",
        prose: [
          "Every box has one short name and one job. A box splits only into the boxes joined directly under it. Do not add a part the problem never mentions: extra boxes do not earn the marks. The lines have no arrowheads, because nothing here is a flow of control.",
          "This is the school library from the section above. Membership, loans and returns are the three sub-systems. Only loans is split again, into the three jobs already named: check the member, check the book, and record the loan. Membership and returns stay as one box each, because this description did not break them down.",
        ],
        structure: {
          title: "The school library",
          label: "Structure diagram. School library splits into Membership, Loans and Returns. Loans splits into Check the member, Check the book, and Record the loan.",
          root: "School library",
          note: "Read each row as the parts of the box above it. Membership is not drawn before loans, and loans is not a step that runs first.",
          children: [
            { text: "Membership" },
            { text: "Loans", children: ["Check the member", "Check the book", "Record the loan"] },
            { text: "Returns" },
          ],
        },
      },
      {
        id: "design",
        kicker: "7.2",
        nav: "Methods",
        title: "Three ways to present a design",
        lede: "The design methods are a structure diagram, a flowchart and pseudocode. Sequence, selection and iteration are not design methods. Neither are inputs and outputs.",
        prose: [
          "A structure diagram shows the parts as a hierarchy. A flowchart shows the steps in order, including decisions, using the standard symbols. Pseudocode states the steps precisely, in the form the exam uses. The same solution can be shown in all three. Each one answers a different question: what are the parts, what happens in what order, and what exactly is each step.",
          "Topic 7.9 is where the flowchart symbols and the pseudocode constructs are drawn out. Use this topic when the question asks you to decompose a system or to draw the hierarchy.",
        ],
        exam: "If the question says “draw a structure diagram”, boxes that the question never mentioned do not earn marks. Use the sub-systems it names.",
      },
    ],
    sort: {
      title: "Which component is it?",
      lede: "A library loan. Place each detail under the component it belongs to.",
      done: "The number typed in is an input. Checking the limit is a process. The receipt is an output. The saved loan is storage.",
      choices: [["input", "Input"], ["process", "Process"], ["output", "Output"], ["storage", "Storage"]],
      cards: [
        { text: "The member number typed at the desk", answer: "input", why: "Data entering the system is an input.", miss: "An output would be something the system sends out." },
        { text: "Checking that the member has not reached the loan limit", answer: "process", why: "Something being done to the data is a process.", miss: "The number itself would be the input. The check is the process." },
        { text: "The receipt printed for the loan", answer: "output", why: "Something produced for a person to see is an output.", miss: "Storage would be data kept for the next loan, not the receipt handed over now." },
        { text: "The loan record kept so it can be checked on return", answer: "storage", why: "Data kept for later use is storage.", miss: "An output leaves the system. This record stays in it." },
      ],
    },
    mcqs: [
      { q: "Every computer system is made of what?", options: ["Files", "Sub-systems, which are made of further sub-systems", "Flowcharts", "Test data"], answer: 1, why: "The breakdown does not stop at the first split. Each sub-system can contain smaller ones." },
      { q: "Which set is the four component parts of a problem?", options: ["Analysis, design, coding, testing", "Inputs, processes, outputs, storage", "Normal, abnormal, extreme, boundary", "Sequence, selection, iteration, totalling"], answer: 1, why: "Those four are the parts after decomposition. The life-cycle stages are a different list." },
      { q: "A structure diagram shows what?", options: ["The order of the steps, with decisions", "The parts of the system as a hierarchy", "The pseudocode of each step", "The test data"], answer: 1, why: "The order belongs on a flowchart. The structure diagram names the parts and joins each part to the box above it." },
      { q: "What is wrong with arrowheads on the lines of a structure diagram?", options: ["Arrowheads are required", "The lines are not a flow of control, so they have no arrowheads", "Arrowheads mean the box is storage", "Only the top box may have an arrowhead"], answer: 1, why: "A flow line with an arrow is a flowchart symbol. A structure diagram only joins a box to the parts under it." },
      { q: "Which of these is a design method?", options: ["Iteration", "A structure diagram", "Boundary data", "A presence check"], answer: 1, why: "The three design methods are structure diagrams, flowcharts and pseudocode. Iteration is a programming construct." },
    ],
    checks: [
      "I can break a system into sub-systems, and those into further sub-systems.",
      "I can give an input, a process, an output and the storage for a system I am shown.",
      "I can draw a structure diagram with one box at the top and lines down, and no arrowheads.",
      "I can say what a structure diagram shows, and what a flowchart shows instead.",
    ],
  },
  "7.3": {
    id: "7.3",
    file: "7-3-purpose.html",
    title: "Purpose of an algorithm",
    paper,
    chapter,
    lede: "State the purpose in one sentence: what goes in, and what comes out. Describe the processes as the separate things the algorithm does. A single result, such as “the output is 9”, is neither of those.",
    mapTitle: "The purpose, then the processes",
    map: [
      ["#purpose", "7.3", "One sentence", "Name the inputs and the output. Do not narrate every line."],
      ["#processes", "7.3", "The processes", "The separate actions, in the order the algorithm does them."],
    ],
    sections: [
      {
        id: "purpose",
        kicker: "7.3",
        nav: "Purpose",
        title: "Say what it is for",
        lede: "Dry-run the algorithm with a few simple values, look at what comes out, and then say what it is for. Do not guess from a familiar name.",
        prose: [
          "The purpose is one sentence about the job. “It outputs the largest of six scores” is a purpose. “It works with numbers” is not, because it never says which numbers or what is produced. “The output is 9” is not, because 9 is the result for one set of data. Another set would give a different number, and the purpose would be the same.",
          "Read the algorithm below before you answer a purpose question. High starts as the first score. Each later score replaces it when it is larger. The output is whatever High holds at the end. The purpose is to output the largest of the six scores. It does not sort them, and it does not search for one named value.",
        ],
        pair: {
          able: ["Explain the purpose of a given algorithm."],
          notes: ["State the purpose of an algorithm. Describe the processes involved in an algorithm."],
        },
        walk: {
          title: "Six scores, one output",
          lede: "High ← Scores[1], then FOR Index ← 2 TO 6, replace High when Scores[Index] is greater, then OUTPUT High. The scores are 4, 9, 2, 9, 1, 6.",
          steps: [
            { label: "Start.", text: "High is Scores[1], so High is 4." },
            { label: "Index = 2.", text: "9 is greater than 4, so High becomes 9." },
            { label: "The rest.", text: "2 is not greater. The second 9 is not greater. 1 and 6 are not greater. High stays 9." },
            { label: "Output.", text: "The algorithm outputs 9. That number is the result. The purpose is to output the largest score." },
          ],
          result: "A purpose that said “find a score of 9” would be wrong. 9 is only the largest value in this list.",
        },
      },
      {
        id: "processes",
        kicker: "7.3",
        nav: "Processes",
        title: "Describe what it does, in order",
        lede: "A process is one action. The purpose is why those actions are there. List the actions when the question asks for the processes.",
        prose: [
          "For the algorithm above, the processes are: set High to the first score; look at each remaining score; replace High when a score is larger; output High. That list is not the purpose. The purpose is the single job those steps achieve.",
          "A second algorithm sets Total to 0, adds each of four marks, divides by 4, and outputs the result. The processes are those four actions. The purpose is to output the average of the four marks. Saying only “it divides” describes one process and misses the job.",
        ],
        exam: "If the question says “state the purpose”, write one sentence about the inputs and the output. If it says “describe the processes”, write the actions. One of those answers does not earn the marks of the other.",
      },
    ],
    sort: {
      title: "Purpose, process, or one result?",
      lede: "The algorithm outputs the largest of six scores. The scores in front of you produce 9.",
      done: "The job is the purpose. One action is a process. The number 9 is a result for this data only.",
      choices: [["purpose", "Purpose"], ["process", "Process"], ["result", "One result"]],
      cards: [
        { text: "It outputs the largest of the six scores", answer: "purpose", why: "That sentence says what goes in and what comes out, for any six scores.", miss: "A process would be a single action, such as one comparison." },
        { text: "It compares a score with the largest so far", answer: "process", why: "That is one action inside the algorithm.", miss: "The purpose is the job of the whole algorithm, not one comparison." },
        { text: "It outputs 9", answer: "result", why: "9 is the output for this list. A different list would output a different number.", miss: "The purpose has to stay true when the scores change." },
        { text: "It sets High to the first score", answer: "process", why: "That is the first action. It is not the reason the algorithm exists.", miss: "The purpose is what the user gets at the end." },
      ],
    },
    mcqs: [
      { q: "High starts as the first of six scores and is replaced whenever a later score is larger. The algorithm then outputs High. What is its purpose?", options: ["To sort the six scores", "To output the largest of the six scores", "To count how many scores were entered", "To output every score"], answer: 1, why: "Only one value is output, and it is the largest. The other scores are not rearranged and are not all output." },
      { q: "Why is “it works with numbers” not a purpose?", options: ["Because numbers are not allowed", "Because it does not say what is input or what is output", "Because a purpose must include the line numbers", "Because a purpose must be written in binary"], answer: 1, why: "A purpose names the job. The inputs and the output are what make the job clear." },
      { q: "The same algorithm outputs 9 for one list of scores. Which statement is true?", options: ["The purpose is to output 9", "9 is the result for that list, not the purpose", "The algorithm searches for the value 9", "The purpose changes for every list"], answer: 1, why: "Dry-run one list to see what the algorithm does. Then state the job in a way that is still true for another list." },
      { q: "Which of these is a process of the average algorithm, not its purpose?", options: ["It outputs the average of four marks", "It adds one mark to a total", "It finds the mean", "It reports one number to the user"], answer: 1, why: "Adding one mark is a single action. The other three all try to name the whole job." },
      { q: "The question says “describe the processes”. Which answer fits?", options: ["One sentence naming the input and the output", "The actions in the order the algorithm does them", "The number that was output", "The name of the file"], answer: 1, why: "Processes are the steps. The one-sentence job is the purpose. The number is a result." },
    ],
    checks: [
      "I can state the purpose of an algorithm in one sentence about the inputs and the output.",
      "I can describe the processes as the separate actions, in order.",
      "I do not treat one result, such as “the output is 9”, as the purpose.",
      "I dry-run the algorithm before I decide what it is for.",
    ],
  },
  "7.4": {
    id: "7.4",
    file: "7-4-standard-methods.html",
    title: "Standard methods of solution",
    paper,
    chapter,
    lede: "These are the only standard methods the questions are limited to. You should be able to recognise each one and say how it works: linear search, bubble sort, totalling, counting, and finding a maximum, a minimum and an average.",
    mapTitle: "Recognise the method, then trace one pass",
    map: [
      ["#methods", "7.4", "The seven methods", "What each one does, and when it stops."],
      ["#bubble", "7.4", "One bubble-sort pass", "Adjacent items only. A linear search does not jump to the middle."],
    ],
    sections: [
      {
        id: "methods",
        kicker: "7.4",
        nav: "Methods",
        title: "The standard methods",
        lede: "Learn the action and the moment it finishes. A question that says “which standard method is this?” is asking for one name from this list.",
        table: {
          title: "What each method does",
          head: ["Method", "The action", "It has finished when"],
          rows: [
            ["Linear search", "Look at each item from the start", "The target is found, or the list ends"],
            ["Bubble sort", "Compare adjacent items and swap them if they are out of order", "A pass makes no swaps"],
            ["Totalling", "Add each value to a running total that started at 0", "Every value has been added"],
            ["Counting", "Add 1 each time an event happens. The count started at 0", "Every item has been checked"],
            ["Maximum", "Replace the largest so far when a value is bigger", "Every value has been seen"],
            ["Minimum", "Replace the smallest so far when a value is smaller", "Every value has been seen"],
            ["Average", "Divide the total by the count", "You have both the total and the count"],
          ],
          note: "Do not divide to find an average before you have both numbers. A maximum does not stop at the first large value. It looks at every value.",
        },
        pair: {
          able: ["Understand standard methods of solution."],
          notes: ["Limited to linear search, bubble sort, totalling, counting, and finding maximum, minimum and average values."],
        },
      },
      {
        id: "bubble",
        kicker: "7.4",
        nav: "A pass",
        title: "One pass, then a search",
        lede: "A bubble sort only compares neighbours. A linear search only moves forward one item at a time.",
        prose: [
          "Each pass of a bubble sort moves one more item into its place. The sort is not finished after one pass unless that pass made no swaps.",
          "After the list is in order, a linear search for 4 looks at 1, then 2, then 4, and stops. It does not jump to the middle of the list.",
        ],
        walk: {
          title: "One pass of a bubble sort on 4, 2, 5, 1",
          steps: [
            { label: "Compare 4 and 2.", text: "They are out of order, so swap. The list is 2, 4, 5, 1." },
            { label: "Compare 4 and 5.", text: "They are in order. Leave them." },
            { label: "Compare 5 and 1.", text: "Swap. The list is 2, 4, 1, 5. The 5 has bubbled to the end." },
            { label: "Next pass.", text: "Repeat on the unsorted part. 2 and 4 stay. 4 and 1 swap, giving 2, 1, 4, 5. A further pass gives 1, 2, 4, 5." },
          ],
          result: "A linear search of that finished list for 4 looks at 1, then 2, then 4, and stops.",
        },
        linksLede: "These simulations are on CompSimu. Each one steps through a standard method from this topic. Open one, follow the steps, then come back and name the method.",
        links: [
          sim("linear-search", "Linear search", "Look at each item in turn until the target is found or the list ends."),
          sim("bubble-sort", "Bubble sort", "Compare adjacent items and swap them when they are out of order. Repeat until a pass makes no swaps."),
          sim("array-sum", "Totalling", "Start a total at 0 and add every value."),
          sim("count-occurrences", "Counting", "Start at 0 and add 1 each time the value you are looking for appears."),
          sim("max-min", "Maximum and minimum", "Keep the largest value seen so far, and the smallest."),
        ],
      },
    ],
    sort: {
      title: "Which standard method is it?",
      lede: "One action from an algorithm. Choose the method.",
      done: "Looking along the list is a linear search. A swap of neighbours is a bubble sort. Adding the value is totalling. Adding 1 is counting.",
      choices: [["search", "Linear search"], ["bubble", "Bubble sort"], ["total", "Totalling"], ["count", "Counting"]],
      cards: [
        { text: "Look at 3, then 8, then 4, and stop because 4 is the target", answer: "search", why: "Each item is inspected in turn until the target is found.", miss: "A bubble sort would compare neighbours and might swap them. It would not stop because it found a 4." },
        { text: "Swap 8 and 3 because they are next to each other and in the wrong order", answer: "bubble", why: "A bubble sort compares adjacent items and swaps them when they are out of order.", miss: "A linear search looks for one target. It does not swap." },
        { text: "Start at 0, then add 5, then add 2, then add 9", answer: "total", why: "A running total starts at 0 and the values themselves are added.", miss: "Counting would add 1, not the value." },
        { text: "Add 1 because this value is over 50", answer: "count", why: "Counting adds 1 when the event happens. The value 50 is not added.", miss: "Totalling would add the value, not 1." },
      ],
    },
    mcqs: [
      { q: "A bubble sort does what?", options: ["Finds one item by checking each position in turn", "Compares adjacent items and swaps them until the list is in order", "Totals a list of numbers", "Counts how many items were entered"], answer: 1, why: "Linear search checks each item in turn. Totalling and counting are separate standard methods." },
      { q: "A linear search of a list for the value 4 does what?", options: ["Jumps to the middle and discards half the list", "Looks at each item from the start until it finds 4 or reaches the end", "Swaps adjacent items", "Divides the total by the count"], answer: 1, why: "A linear search does not discard half the list. It moves one item at a time." },
      { q: "An average must not be calculated until what is true?", options: ["The list is sorted", "Both the total and the count are known", "A linear search has found the target", "The first value has been seen"], answer: 1, why: "The average is the total divided by the count. Either number on its own is not enough." },
      { q: "A maximum is updated when…", options: ["The first value has been stored, and then the scan can stop", "A value is larger than the largest stored so far", "Two adjacent values are out of order", "The count is increased by 1"], answer: 1, why: "Finding a maximum looks at every value. It does not stop at the first one." },
      { q: "Which starting value is right for a total and for a count?", options: ["Both start at 1", "Both start at 0", "The total starts at 0 and the count starts at 1", "The total starts at the first value and the count starts at 0"], answer: 1, why: "Nothing has been added yet, and nothing has been counted yet. Both start at 0 before the loop. A maximum is different: it often starts as the first value." },
    ],
    checks: [
      "I can describe a linear search and a bubble sort, including when each one stops.",
      "I can total a list, count events, and find a maximum, a minimum and an average.",
      "I know an average needs both the total and the count.",
      "I can name the method when I am shown one action from it.",
    ],
  },
  "7.5": {
    id: "7.5",
    file: "7-5-validation.html",
    title: "Validation and verification",
    paper,
    chapter,
    lede: "Validation asks whether the data is sensible. Verification asks whether it was entered correctly. A value can pass one and fail the other. A value can pass both and still be untrue.",
    mapTitle: "The check, then which group it belongs to",
    map: [
      ["#difference", "7.5", "Two questions", "Sensible data, or the same data as the source."],
      ["#types", "7.5", "The eight checks", "Six validation checks. Visual check and double entry."],
    ],
    sections: [
      {
        id: "difference",
        kicker: "7.5",
        nav: "The difference",
        title: "Sensible, or copied correctly",
        lede: "A range check can accept a mark of 99. A double entry check can also accept 99, if 99 was typed twice. Neither check knows that the candidate scored 69.",
        prose: [
          "Validation rejects data that is not reasonable: outside a range, the wrong length, the wrong type, missing, in the wrong format, or with a check digit that does not match. The data can still be the wrong fact. A mark of 99 is sensible for a paper out of 100.",
          "Verification asks whether the data was copied correctly from the source. A visual check means a person looks at the entered data and compares it with the source. A double entry check asks for the data twice and compares the two copies. If the person typed 99 both times and did not look back at the paper, verification accepts 99 as well.",
        ],
        pair: {
          able: [
            "Understand the need for validation checks and the different types.",
            "Understand the need for verification checks and the different types.",
          ],
          notes: [
            "Validation: range, length, type, presence, format and check digit.",
            "Verification: visual check and double entry.",
          ],
        },
        exam: "A visual check is verification, not validation. A range check is validation, not verification.",
      },
      {
        id: "types",
        kicker: "7.5",
        nav: "The checks",
        title: "Name the check from the mistake it catches",
        lede: "Learn the mistake, not only the name. The question will describe the mistake and ask for the check.",
        table: {
          title: "Eight checks",
          head: ["Check", "Group", "It rejects"],
          rows: [
            ["Range", "Validation", "A number outside stated limits, such as a mark below 0 or above 100"],
            ["Length", "Validation", "An entry that is too short or too long"],
            ["Type", "Validation", "The wrong kind of data, such as letters where an integer is required"],
            ["Presence", "Validation", "An empty entry"],
            ["Format", "Validation", "An entry that does not match a pattern, such as a date that is not DD/MM/YYYY"],
            ["Check digit", "Validation", "A number whose calculated final digit does not match, such as a mistyped ISBN"],
            ["Visual check", "Verification", "Nothing by itself. A person compares the entry with the source"],
            ["Double entry", "Verification", "An entry that does not match the second copy of the same entry"],
          ],
          note: "A check digit catches a typing error in a code. It does not prove the code belongs to the right book. That is a different question.",
        },
      },
    ],
    sort: {
      title: "Validation or verification?",
      lede: "Place the check in the group the syllabus uses.",
      done: "Range, length, type, presence, format and check digit are validation. A visual check and double entry are verification.",
      choices: [["valid", "Validation"], ["verify", "Verification"]],
      cards: [
        { text: "Range check", answer: "valid", why: "A range check asks whether the number is sensible.", miss: "Verification compares the entry with a source or a second copy." },
        { text: "Visual check", answer: "verify", why: "A person compares what was entered with the original.", miss: "A visual check does not test a range, a type or a format." },
        { text: "Double entry", answer: "verify", why: "The two copies are compared. That checks the copying, not whether the value is sensible.", miss: "Validation would still accept 99 typed twice, if 99 is inside the range." },
        { text: "Check digit", answer: "valid", why: "A check digit tests whether the number itself is consistent. It is validation.", miss: "Double entry would be the verification check that also catches a mistype." },
        { text: "Presence check", answer: "valid", why: "An empty entry is not sensible data. Presence is validation.", miss: "A visual check would be a person looking back at the source." },
        { text: "Format check", answer: "valid", why: "A pattern such as DD/MM/YYYY tests the form of the data. That is validation.", miss: "Verification does not care about the pattern. It cares whether the copy matches." },
      ],
    },
    mcqs: [
      { q: "Which validation check rejects a number that is too high?", options: ["Range check", "Presence check", "Visual check", "Double entry"], answer: 0, why: "A range check tests the limits. A presence check only tests that something was entered. A visual check is verification." },
      { q: "Double entry is an example of what?", options: ["Validation", "Verification", "Compression", "Encryption"], answer: 1, why: "Verification checks that the data was copied correctly. Validation checks that it is sensible." },
      { q: "A date must be entered as DD/MM/YYYY. Which check rejects 31/02/2026?", options: ["Presence check", "Format check", "Visual check", "Double entry"], answer: 1, why: "The entry does not match the required pattern. A presence check would only notice an empty box." },
      { q: "Letters are typed where a whole number is required. Which check rejects them?", options: ["Type check", "Length check", "Range check", "Check digit"], answer: 0, why: "The kind of data is wrong. A range check needs a number before it can test the limits." },
      { q: "A candidate scored 69. The mark 99 is typed twice and is inside the allowed range. What is true?", options: ["Validation rejects it", "Verification rejects it", "Both can accept it, and the stored mark is still wrong", "A check digit must reject it"], answer: 2, why: "99 is sensible, and the two copies match. Neither check looks at the candidate’s real score." },
    ],
    checks: [
      "I can say what validation asks, and what verification asks.",
      "I can name the six validation checks: range, length, type, presence, format and check digit.",
      "I can name the two verification checks: visual check and double entry.",
      "I can explain how a sensible value can still be the wrong fact.",
    ],
  },
  "7.6": {
    id: "7.6",
    file: "7-6-test-data.html",
    title: "Test data",
    paper,
    chapter,
    lede: "Choose data that should be accepted, data that should be rejected, and the values on the boundary. The four names are normal, abnormal, extreme and boundary. Extreme and boundary are not the same set.",
    mapTitle: "The four names, then a full set",
    map: [
      ["#kinds", "7.6", "Four kinds", "Normal, abnormal, extreme and boundary."],
      ["#set", "7.6", "One range", "For 1 to 10, name a normal value and the boundary set."],
    ],
    sections: [
      {
        id: "kinds",
        kicker: "7.6",
        nav: "Four kinds",
        title: "Normal, abnormal, extreme and boundary",
        lede: "Normal is typical and should be accepted. Abnormal should be rejected, because it is outside the range or the wrong type. Extreme is still accepted. Boundary is a pair: the accepted end and the first rejected value beside it.",
        prose: [
          "Extreme data is the largest and the smallest value that should still be accepted. A rejected value is not extreme. Boundary data is a pair: an extreme value together with the first value on that side that should be rejected.",
          "For a whole number from 1 to 10, 5 is normal. The extreme values are 1 and 10. 11 is abnormal: it is outside the range, so it should be rejected. 0 is abnormal for the same reason. Text such as “ten” is also abnormal, because the type is wrong. The boundary pairs are 1 with 0, and 10 with 11. 11 on its own is not extreme, and it is not the whole boundary pair.",
        ],
        pair: {
          able: ["Suggest and apply suitable test data."],
          notes: [
            "Test data is limited to normal, abnormal, extreme and boundary.",
            "Extreme data is the largest and smallest acceptable value.",
            "Boundary data is the largest and smallest acceptable value and the corresponding smallest and largest rejected value.",
          ],
        },
        exam: "11 is abnormal, not extreme. Extreme data is accepted: for 1 to 10, that is 1 and 10. If the question asks for boundary data, give the pair 10 and 11, not 11 on its own.",
      },
      {
        id: "set",
        kicker: "7.6",
        nav: "A set",
        title: "Build the set before you name one value",
        lede: "Write the two extreme values first. They are accepted. Then write the rejected value beside each one: that rejected value is abnormal, and the two values together are a boundary pair.",
        table: {
          title: "A whole-number mark from 0 to 100",
          head: ["Kind", "Examples", "Accepted?"],
          rows: [
            ["Normal", "40, 73", "Yes"],
            ["Extreme", "0 and 100", "Yes. These are the ends of the allowed range"],
            ["Boundary", "0 with −1, and 100 with 101", "One accepted end and the first rejected value beside it"],
            ["Abnormal", "101, −1, or “seventy”", "No. Out of range, or the wrong type"],
          ],
          note: "Do not call 101 extreme. It should be rejected, so it is abnormal. The boundary answer for that end is the pair 100 and 101.",
        },
      },
    ],
    sort: {
      title: "What kind of test data is it?",
      lede: "A program accepts a whole number from 1 to 10. Choose one label for each card.",
      done: "5 is normal. 10 is extreme, because it is still accepted. 11 is abnormal, because it is outside the range and should be rejected. The pair 10 and 11 is boundary data.",
      choices: [["normal", "Normal"], ["abnormal", "Abnormal"], ["extreme", "Extreme"], ["boundary", "Boundary"]],
      cards: [
        { text: "5", answer: "normal", why: "5 is inside the range and is a typical accepted value.", miss: "Extreme would be 1 or 10. 11 would be abnormal." },
        { text: "10", answer: "extreme", why: "10 is the largest value that should still be accepted. That single value is extreme. 11 is not part of this answer.", miss: "11 is rejected, so 11 is abnormal. 10 is still accepted." },
        { text: "11", answer: "abnormal", why: "11 is outside 1 to 10, so it should be rejected. Rejected data is abnormal. It is not extreme: extreme values are 1 and 10, and they are accepted.", miss: "Extreme data is still accepted. 11 is rejected, so it is abnormal." },
        { text: "10 and 11", answer: "boundary", why: "Boundary data is the pair: the largest accepted value, 10, and the first rejected value beside it, 11.", miss: "10 alone is extreme. 11 alone is abnormal. The pair is the boundary data." },
      ],
    },
    mcqs: [
      { q: "A program accepts a whole number from 1 to 10. Which value is normal test data?", options: ["1", "5", "10", "11"], answer: 1, why: "5 is typical and should be accepted. 1 and 10 are the extremes. 11 should be rejected." },
      { q: "For the same program, which pair is the extreme data?", options: ["0 and 11", "1 and 10", "5 and 6", "0 and 1"], answer: 1, why: "Extreme data is the smallest and largest value that should still be accepted." },
      { q: "Which set is the boundary data for whole numbers from 1 to 10?", options: ["1 and 10", "0 and 11", "0, 1, 10 and 11", "5 and “ten”"], answer: 2, why: "Boundary data is the pairs at each end: 0 with 1, and 10 with 11. 11 on its own is abnormal, because it is rejected." },
      { q: "A program accepts a whole number from 1 to 10. What type of test data is 11?", options: ["Extreme", "Abnormal", "Normal", "The largest accepted value"], answer: 1, why: "11 is outside the range, so it should be rejected. Rejected data is abnormal. Extreme data is 1 and 10, and those values are still accepted." },
      { q: "A mark from 0 to 100 is a whole number. Which value is not extreme?", options: ["0", "100", "101", "Both 0 and 100 are extreme"], answer: 2, why: "101 should be rejected, so it is abnormal. Extreme values are still accepted. The boundary pair at that end is 100 and 101." },
    ],
    checks: [
      "I can define normal, abnormal, extreme and boundary data.",
      "I know extreme data is the largest and smallest acceptable value.",
      "I know a rejected value such as 11 is abnormal, not extreme.",
      "I know boundary data is the accepted end together with the first rejected value beside it.",
      "I can give an example of each for a stated range.",
    ],
  },
  "7.7": {
    id: "7.7",
    file: "7-7-trace-tables.html",
    title: "Trace tables",
    paper,
    chapter,
    lede: "A trace table is a dry run written down. Each row is a step where something changes. The columns are the variables, the outputs and the user prompts. Do not jump to the answer you expect.",
    mapTitle: "What to record, then one dry run",
    map: [
      ["#columns", "7.7", "The columns", "Variables, outputs and user prompts."],
      ["#dry", "7.7", "A dry run", "Total the numbers 1, 2 and 3. The output is 6."],
    ],
    sections: [
      {
        id: "columns",
        kicker: "7.7",
        nav: "Columns",
        title: "What a trace table records",
        lede: "Work down the algorithm. Write a new row when a variable changes, when something is output, or when the user is prompted. Leave a cell blank when that column did not change.",
        prose: [
          "The variable columns hold the values after that step. If Total changes from 0 to 1, the new row shows 1, not the old 0. The output column records only what was sent out on that step. A prompt such as OUTPUT \"Enter the mark\" is recorded too, because a user prompt is part of the trace.",
          "Do not write one row per line if the line did not change anything you are tracking. Do not fill the output column with the variables. The output column is only for OUTPUT.",
        ],
        pair: {
          able: ["Complete a trace table to document a dry run of an algorithm."],
          notes: ["A trace includes variables, outputs and user prompts at each step."],
        },
        table: {
          title: "The row is the step, not the line number",
          head: ["Step", "Count", "Total", "Output"],
          rows: [
            ["Total ← 0", "", "0", ""],
            ["Count ← 1", "1", "0", ""],
            ["Total ← Total + Count", "1", "1", ""],
            ["Count ← 2", "2", "1", ""],
            ["Total ← Total + Count", "2", "3", ""],
            ["Count ← 3", "3", "3", ""],
            ["Total ← Total + Count", "3", "6", ""],
            ["OUTPUT Total", "3", "6", "6"],
          ],
          note: "The output column stays empty until the OUTPUT line. The variables stay visible so the next row can be checked against them.",
        },
      },
      {
        id: "dry",
        kicker: "7.7",
        nav: "Dry run",
        title: "Total the numbers 1, 2 and 3",
        lede: "Total ← 0, then FOR Count ← 1 TO 3, Total ← Total + Count, and finally OUTPUT Total.",
        walk: {
          title: "Follow the total, not the answer you hope for",
          steps: [
            { label: "Start.", text: "Total is 0. Nothing has been output." },
            { label: "Count = 1.", text: "Total becomes 0 + 1 = 1." },
            { label: "Count = 2.", text: "Total becomes 1 + 2 = 3." },
            { label: "Count = 3.", text: "Total becomes 3 + 3 = 6." },
            { label: "Output.", text: "The output column records 6. The loop has ended. Count is 3." },
          ],
          result: "Change one line to Total ← Total + 1 and the output becomes 3. That line counts the passes. It does not total the values. The trace is how you notice.",
        },
        exam: "Write the value after the step. If you are asked for the output, look only at the output column. The last value of Total is not an output unless a line outputs it.",
      },
    ],
    mcqs: [
      { q: "Which three things does a trace table record at each step?", options: ["Inputs, processes and storage only", "Variables, outputs and user prompts", "Normal, extreme and boundary data", "The life-cycle stage"], answer: 1, why: "Those are the three columns the syllabus names. A prompt to the user is recorded as well as the values." },
      { q: "Total starts at 0. The loop adds Count for Count from 1 to 3, then outputs Total. What is output?", options: ["3", "6", "0", "1"], answer: 1, why: "0 + 1 = 1, then 1 + 2 = 3, then 3 + 3 = 6. The output is 6." },
      { q: "In that same trace, what is Count when the loop has ended?", options: ["0", "1", "3", "6"], answer: 2, why: "Count takes the values 1, 2 and 3. The loop includes both ends, so it stops after 3. Count is not the total." },
      { q: "The line is changed to Total ← Total + 1, still for Count from 1 to 3. What is output?", options: ["3", "6", "1", "0"], answer: 0, why: "The total increases by 1 on each pass. Three passes give 3. The values of Count are ignored." },
      { q: "When do you write a new row?", options: ["Once, at the end", "When a variable, an output or a prompt changes", "Only when the algorithm has an error", "On every blank line of the question paper"], answer: 1, why: "A row records a change you are tracking. A blank line in the question is not a step." },
    ],
    checks: [
      "I can name the three things a trace records: variables, outputs and user prompts.",
      "I write a new row when one of those changes, and I write the new value.",
      "I can dry-run a short loop and say what is output.",
      "I can see the difference between adding the counter and adding 1.",
    ],
  },
  "7.8": {
    id: "7.8",
    file: "7-8-correcting-errors.html",
    title: "Finding and correcting errors",
    paper,
    chapter,
    lede: "Find the line or the box that is wrong, say what is wrong, and write the correction. “It does not work” does not earn the mark. The correction has to be the statement that should be there.",
    mapTitle: "Where the error hides, then how to write the fix",
    map: [
      ["#places", "7.8", "Where to look", "The condition, the starting value, the branch, and a reset inside a loop."],
      ["#repair", "7.8", "The correction", "Name the place, the fault, and the statement that replaces it."],
    ],
    sections: [
      {
        id: "places",
        kicker: "7.8",
        nav: "Where",
        title: "Errors that look small and change the result",
        lede: "Trace it. The moment the values leave the path you expect is the line to inspect. These four faults appear often.",
        prose: [
          "A condition can be impossible. Mark < 0 AND Mark > 100 is never true, because one number cannot be both. The test for a mark outside 0 to 100 is Mark < 0 OR Mark > 100. Swapping the Yes and No labels on a decision sends the steps down the other path. The diamond can be right and the labels wrong.",
          "A count or a total can start at the wrong value. A count of events starts at 0. Starting at 1 makes the count one too high before anything has happened. A reset inside the loop is a different fault: Total ← 0 on every pass throws away every value except the last one. The reset belongs before the loop.",
        ],
        pair: {
          able: ["Identify errors in an algorithm and suggest corrections."],
          notes: ["Say where the error is, what is wrong, and the statement that should be there instead."],
        },
        walk: {
          title: "Only the last price survives",
          lede: "Prices holds 3, 5, 2 and 6. The algorithm is meant to output their total.",
          steps: [
            { label: "The lines.", text: "Count ← 0, then FOR Index ← 1 TO 4, then Total ← 0, then Total ← Total + Prices[Index], then NEXT Index, then OUTPUT Total." },
            { label: "Index = 1.", text: "Total is set to 0 and then becomes 3." },
            { label: "Index = 2.", text: "Total is set back to 0 and then becomes 5. The 3 has been lost." },
            { label: "The end.", text: "The same thing happens for 2 and then for 6. The output is 6, not 16." },
          ],
          result: "The error is Total ← 0 inside the loop. The correction is to delete that line from the loop and write Total ← 0 before the loop.",
        },
      },
      {
        id: "repair",
        kicker: "7.8",
        nav: "The fix",
        title: "Write the correction as a statement",
        lede: "Three things: where, what is wrong, and the replacement. A description of the fault without the new statement is incomplete.",
        prose: [
          "“The total is reset too often” points at the fault. The correction is the line in its new place: Total ← 0 before FOR, and no Total ← 0 inside the loop. “The condition is wrong” is the same kind of half answer. The correction is Mark < 0 OR Mark > 100.",
          "Use the names already in the algorithm. A corrected line that introduces a new variable, or that writes the test in a sentence, is not the answer the paper wants. x > y is a condition. “x is greater than y” is not.",
        ],
        exam: "If both the Yes and No paths are drawn, check the labels before you redraw the diamond. A swapped label is corrected by swapping the words, not by adding another decision.",
      },
    ],
    mcqs: [
      { q: "Total ← 0 is inside the loop that adds each price. The output is only the last price. What is the correction?", options: ["Set Total to 0 after the output", "Delete Total ← 0 from inside the loop and put it before the loop", "Start Total at 1", "Divide Total by the count inside the loop"], answer: 1, why: "The reset throws away the running total. It has to happen once, before any price is added." },
      { q: "The test Mark < 0 AND Mark > 100 is meant to find a mark outside 0 to 100. Why does it fail?", options: ["AND is the right operator, but the numbers are wrong", "A mark cannot be both below 0 and above 100, so the test is never true", "The test rejects every mark", "AND is verification, not a condition"], answer: 1, why: "The two sides cannot be true together. The correction uses OR." },
      { q: "What replaces Mark < 0 AND Mark > 100?", options: ["Mark < 0 OR Mark > 100", "Mark < 0 AND Mark < 100", "Mark > 0 AND Mark < 100", "Mark = 0 OR Mark = 100"], answer: 0, why: "Outside the range means below the bottom or above the top. OR joins those two rejected cases." },
      { q: "A count of matching names starts at 1, before the loop. No name has been seen. What is wrong, and what is the correction?", options: ["Nothing. A count starts at 1", "The count is already one too high. Start it at 0", "The count should start at the length of the list", "The count should start at −1"], answer: 1, why: "Nothing has been counted yet. The first match should take the count from 0 to 1." },
      { q: "A decision asks “Mark >= 50?”. The pass message is drawn on the No path. What is the correction?", options: ["Add a second decision", "Swap the Yes and No labels, or move the pass message to the Yes path", "Delete the decision", "Change the question to a process box"], answer: 1, why: "The question can stay. The paths are labelled the wrong way round. Say which label moves." },
    ],
    checks: [
      "I can find a reset that sits inside a loop and should sit before it.",
      "I can tell an impossible AND from the OR that was intended.",
      "I can spot a count or a total that starts at the wrong value.",
      "I write the correction as the statement that should replace the faulty one.",
    ],
  },
  "7.9": {
    id: "7.9",
    file: "7-9-writing-algorithms.html",
    title: "Writing and amending algorithms",
    paper,
    chapter,
    lede: "On this paper an algorithm is written in pseudocode. Program code is not credited, except in the 15-mark scenario, which also allows Python, Visual Basic or Java. A flowchart uses the six symbols. Precision matters: x > y is acceptable, and the sentence “x is greater than y” is not.",
    mapTitle: "The rules, the symbols, then the examples",
    map: [
      ["#rules", "7.9", "How an answer is written", "Pseudocode on most of the paper. No line numbers in your answer."],
      ["#symbols", "7.9", "Flowchart symbols", "The six shapes. A decision has two labelled lines."],
      ["#flowcharts", "7.9", "Flowchart examples", "Sequence, decision, loop and a subroutine call."],
      ["#pseudocode", "7.9", "Pseudocode examples", "Every construct in the syllabus guide, one group at a time."],
    ],
    sections: [
      {
        id: "rules",
        kicker: "7.9",
        nav: "Rules",
        title: "What the answer has to look like",
        lede: "Keywords are upper case. Identifiers start with a capital letter. Assignment uses ←. A comment starts with //. Indent the statements inside a selection, a loop or a subroutine.",
        prose: [
          "You can be asked to write or amend an algorithm in pseudocode, in program code, or as a flowchart. On this paper, pseudocode is what earns the marks, except for the 15-mark scenario question. In that question you may use pseudocode or one of Python, Visual Basic or Java. Another programming language is not credited.",
          "The question paper numbers the lines of pseudocode it gives you. When you write an answer, do not number the lines. Spend time on the 15-mark scenario: it is unseen, and it can be pseudocode or Python, Visual Basic or Java.",
        ],
        pair: {
          able: ["Write and amend algorithms for given problems using pseudocode, program code and flowcharts."],
          notes: [
            "Precision is required. x > y is acceptable. “x is greater than y” is not.",
            "Use the standard flowchart symbols and the pseudocode format from the syllabus.",
          ],
        },
        note: "Equals is a comparison. The arrow is the assignment. Score ← 50 stores 50. Score = 50 asks whether they are already equal.",
      },
      {
        id: "symbols",
        kicker: "7.9",
        nav: "Symbols",
        title: "Flowchart symbols you must use",
        lede: "An arrow is a flow line: control passes along it. A decision has two flow lines. A subroutine box is a call, not the subroutine itself.",
        table: {
          title: "The six symbols",
          head: ["Symbol", "What it shows"],
          rows: [
            ["Terminator", "The start or the stop of the process"],
            ["Flow line", "An arrow. Control passes along it"],
            ["Process", "Something being done"],
            ["Input or output", "Data coming in or a result going out"],
            ["Decision", "A yes/no question, with two outgoing paths"],
            ["Subroutine", "A call to a separate flowchart"],
          ],
          note: "The examples on this page draw these shapes. A decision has two labelled flow lines. A subroutine box calls a separate flowchart, and that flowchart is not joined on.",
        },
      },
      {
        id: "flowcharts",
        kicker: "Flowcharts",
        nav: "Flowcharts",
        title: "Flowchart examples",
        lede: "These use only the six symbols from the syllabus. Open one example at a time.",
        tabs: {
          id: "chart",
          lede: "The same symbols appear in a sequence, a decision, a loop and a subroutine call.",
          items: [
            {
              label: "Sequence",
              note: "A terminator starts and stops the chart. A parallelogram is input or output. A rectangle is a process. Nothing here asks a question, so there is no decision. The Celsius that was input is the value the formula uses, and Fahrenheit is what gets output.",
              charts: [{
                title: "Celsius to Fahrenheit",
                steps: [
                  { shape: "term", text: "Start" },
                  { shape: "io", text: "INPUT Celsius" },
                  { shape: "process", text: "Fahrenheit ← (Celsius * 9 / 5) + 32" },
                  { shape: "io", text: "OUTPUT Fahrenheit" },
                  { shape: "term", text: "Stop" },
                ],
              }],
            },
            {
              label: "Decision",
              note: "The diamond asks a question with two outcomes. The Yes line leaves the left point and the No line leaves the right point. Both paths meet again before Stop.",
              charts: [{
                title: "Pass or fail",
                layout: "decision",
                input: "INPUT Mark",
                question: "Mark >= 50?",
                yes: "OUTPUT \"Pass\"",
                no: "OUTPUT \"Fail\"",
              }],
            },
            {
              label: "Loop",
              note: "A loop is a decision whose Yes flow line comes back. This one outputs 1, then 2, then 3. When Count becomes 4 the No line leaves the loop. The line on the left returns to the decision.",
              charts: [{
                title: "Count from 1 to 3",
                layout: "loop",
                setup: "Count ← 1",
                question: "Count <= 3?",
                body: ["OUTPUT Count", "Count ← Count + 1"],
              }],
            },
            {
              label: "Subroutine",
              stack: true,
              note: "The two vertical lines inside the rectangle mark a subroutine call. CalculatePay is a separate flowchart because it makes a decision: basic pay is Hours times Rate, and extra pay is added only when Hours is over 40. Do not draw a flow line from the main chart into that one. After the call, the main chart outputs Pay.",
              charts: [
                {
                  title: "Main flowchart",
                  steps: [
                    { shape: "term", text: "Start" },
                    { shape: "io", text: "INPUT Hours" },
                    { shape: "io", text: "INPUT Rate" },
                    { shape: "sub", text: "CalculatePay" },
                    { shape: "io", text: "OUTPUT Pay" },
                    { shape: "term", text: "Stop" },
                  ],
                },
                {
                  title: "Separate flowchart for CalculatePay",
                  layout: "pay",
                  basic: "Pay ← Hours * Rate",
                  question: "Hours > 40?",
                  extra: "Extra ← (Hours - 40) * Rate * 0.5",
                  add: "Pay ← Pay + Extra",
                },
              ],
            },
          ],
        },
      },
      {
        id: "pseudocode",
        kicker: "Pseudocode",
        nav: "Pseudocode",
        title: "Pseudocode examples",
        lede: "This is the syntax the exam uses. Keywords are upper case. Identifiers are Pascal case, start with a capital letter, and use only letters and digits. Assignment is ←. A comment starts with //. Lines inside a statement are indented by four spaces. THEN, ELSE and each CASE value are indented by only two spaces.",
        tabs: {
          id: "code",
          lede: "One construct group is open at a time. Copy the pattern, not the sample names.",
          items: [
            {
              label: "Types and assignment",
              note: "INTEGER, REAL, CHAR, STRING and BOOLEAN are the five types. A real literal needs a digit on both sides of the point, such as 4.7, 0.3, -4.0 or 0.0. A character uses single quotes. A string uses double quotes, and \"\" is the empty string. TRUE and FALSE are the Boolean literals. A constant is a literal only: never another variable or an expression. Countdown and CountDown would be the same identifier, so do not declare both.",
              code: `// A comment occupies the rest of the line
DECLARE Counter : INTEGER
DECLARE TotalToPay : REAL
DECLARE Initial : CHAR
DECLARE Pupil : STRING
DECLARE Finished : BOOLEAN
CONSTANT PassMark ← 50
CONSTANT Rate ← 6.50
CONSTANT Blank ← ""
Counter ← 0
Counter ← Counter + 1 // a short comment may sit at the end
TotalToPay ← Hours * Rate
Initial ← 'A'
Pupil ← "Amina"
Finished ← FALSE`,
            },
            {
              label: "Input, output, operators",
              note: "INPUT reads into a variable. OUTPUT can send several values, separated by commas. * and / are done before + and -. Use parentheses when the order matters. DIV returns the whole-number quotient and MOD returns the remainder. The relational operators are = < <= > >= and <>. They produce a Boolean. AND, OR and NOT also produce a Boolean.",
              code: `OUTPUT "Enter the mark"
INPUT Mark
OUTPUT "You scored ", Mark, " marks"
Answer ← Score * 100 / MaxMark
Area ← 3.14 * Radius ^ 2
Quotient ← DIV(10, 3) // returns 3
Remainder ← MOD(10, 3) // returns 1
IF (Mark < 0 OR Mark > 100) AND NOT Finished
  THEN
    Accepted ← FALSE
  ELSE
    Accepted ← TRUE
ENDIF
IF Reply <> "Y"
  THEN
    OUTPUT "Stopping"
ENDIF`,
            },
            {
              label: "Selection",
              note: "THEN and ELSE stay indented by two spaces, including inside a nested IF. A CASE value is also indented by two spaces. Cases are tested in order. The first match runs, then control goes to the line after ENDCASE. OTHERWISE, if you use it, is the last case.",
              code: `// IF with no ELSE
IF Score > HighScore
  THEN
    HighScore ← Score
ENDIF

// IF with ELSE
IF Score >= PassMark
  THEN
    OUTPUT "Pass"
  ELSE
    OUTPUT "Fail"
ENDIF

// Nested IF. The inner IF is indented by four spaces.
IF NewScore > BestScore
  THEN
    IF NewScore > Record
      THEN
        OUTPUT Name, " has the record"
      ELSE
        OUTPUT Name, " is in the lead"
    ENDIF
  ELSE
    OUTPUT "No change"
ENDIF

INPUT Move
CASE OF Move
  'W' : Position ← Position - 10
  'E' : Position ← Position + 10
  'A' : Position ← Position - 1
  'D' : Position ← Position + 1
  OTHERWISE
    OUTPUT "Beep"
ENDCASE`,
            },
            {
              label: "Iteration",
              note: "FOR uses an integer counter. It includes both end values. If the start is already past the end, the body does not run. STEP can be negative. REPEAT runs the body at least once and stops when the UNTIL condition is TRUE. WHILE tests first, so the body may never run, and it stops when the condition is FALSE.",
              code: `// Count-controlled, including both ends
FOR Count ← 1 TO 3
    Total ← Total + Count
NEXT Count

// A negative step counts downwards
FOR Count ← 3 TO 1 STEP -1
    OUTPUT Count
NEXT Count

// Nested FOR. Each contained level is indented by four more spaces.
Total ← 0
FOR Row ← 1 TO MaxRow
    RowTotal ← 0
    FOR Column ← 1 TO 10
        RowTotal ← RowTotal + Marks[Row, Column]
    NEXT Column
    OUTPUT "Total for row ", Row, " is ", RowTotal
    Total ← Total + RowTotal
NEXT Row
OUTPUT "The grand total is ", Total

// Post-condition loop
REPEAT
    OUTPUT "Enter the password"
    INPUT Password
UNTIL Password = "Secret"

// Pre-condition loop
WHILE Number > 9 DO
    Number ← Number - 9
ENDWHILE`,
            },
            {
              label: "Arrays and strings",
              note: "State the lower and upper index. A lower bound of 1 is the usual choice in this course. A question may instead start at 0. Use one index for each dimension, and a variable may be that index. LENGTH returns an integer. LCASE and UCASE change case. SUBSTRING(text, start, length) uses 1 as the first character unless the question says otherwise.",
              code: `DECLARE Names : ARRAY[1:30] OF STRING
DECLARE Board : ARRAY[1:3, 1:3] OF CHAR
Names[1] ← "Ali"
Board[2, 3] ← 'X'
Names[Index + 1] ← Names[Index]
FOR Index ← 1 TO 30
    Names[Index] ← ""
NEXT Index

Length ← LENGTH("Revision") // returns 8
Letter ← LCASE('A') // returns 'a'
Word ← UCASE("mark") // returns "MARK"
Piece ← SUBSTRING("Computer", 1, 3) // returns "Com"`,
            },
            {
              label: "Procedures and functions",
              note: "Define procedures and functions at the start of the program. A procedure does a job. CALL runs it, with or without arguments, and CALL is a complete statement. A function returns one value with RETURN. Do not use CALL for a function: write the call inside an expression. Either may have up to three parameters.",
              code: `PROCEDURE DrawDefault
    CALL DrawLine(40)
ENDPROCEDURE

PROCEDURE DrawLine(Size : INTEGER)
    DECLARE Length : INTEGER
    FOR Length ← 1 TO Size
        OUTPUT "-"
    NEXT Length
ENDPROCEDURE

FUNCTION SumOfSquares(Number1 : INTEGER, Number2 : INTEGER) RETURNS INTEGER
    RETURN Number1 * Number1 + Number2 * Number2
ENDFUNCTION

IF MySize = Default
  THEN
    CALL DrawDefault
  ELSE
    CALL DrawLine(MySize)
ENDIF
OUTPUT "Sum of squares = ", SumOfSquares(10, 20)`,
            },
            {
              label: "Files and library routines",
              note: "Open a file before you use it, in one mode only. READ reads existing data. WRITE creates a new file and any data already in it is lost. READFILE reads one item into a variable. WRITEFILE writes one item. Close the file when you have finished. RANDOM() returns a real number from 0 to 1 inclusive. ROUND(value, places) rounds a real number to that many decimal places. MOD, DIV, ROUND and RANDOM are the library routines.",
              code: `DECLARE LineOfText : STRING
OPENFILE "Scores.txt" FOR READ
OPENFILE "Copy.txt" FOR WRITE
READFILE "Scores.txt", LineOfText
WRITEFILE "Copy.txt", LineOfText
CLOSEFILE "Scores.txt"
CLOSEFILE "Copy.txt"

Value ← ROUND(RANDOM() * 6, 0)`,
            },
          ],
        },
      },
    ],
    mcqs: [
      { q: "On most of Paper 2, an algorithm must be written in what?", options: ["Any programming language", "Pseudocode", "Machine code", "SQL"], answer: 1, why: "Program code is not credited, except in the 15-mark scenario, which also allows Python, Visual Basic or Java." },
      { q: "Which of these is an acceptable condition?", options: ["x is greater than y", "x > y", "x becomes greater than y", "x greater y"], answer: 1, why: "The condition has to be precise. A sentence is not pseudocode." },
      { q: "Score ← 50 means what?", options: ["Ask whether Score equals 50", "Store 50 in Score", "Output 50", "Increase Score by 50"], answer: 1, why: "The arrow is assignment. The equals sign is the comparison." },
      { q: "A decision symbol must have what?", options: ["One outgoing line", "Two outgoing lines, each labelled with an outcome", "No labels", "A flow line back to Start in every case"], answer: 1, why: "The diamond asks a yes/no question. Each outcome leaves along its own labelled line." },
      { q: "When you write pseudocode in an answer, what do you do about line numbers?", options: ["Number every line, as the question paper does", "Do not number the lines", "Number only the lines inside a loop", "Start at line 10"], answer: 1, why: "The paper numbers the lines it gives you so that questions can refer to them. Your own answer is not numbered." },
      { q: "A rectangle with double bars at the sides means what?", options: ["A decision", "A subroutine call, drawn separately from the flowchart it calls", "The end of the program", "An input"], answer: 1, why: "The call is one box. The flowchart of that subroutine is a different chart, and you do not join them with a flow line." },
    ],
    checks: [
      "I can write a condition as x > y, and an assignment with ←.",
      "I know pseudocode is required on most of Paper 2, with the 15-mark exception.",
      "I can use the six flowchart symbols, including two labelled outcomes from a decision.",
      "I can write IF, CASE, FOR, REPEAT, WHILE, a procedure and a function in the syllabus syntax.",
    ],
  },
};
