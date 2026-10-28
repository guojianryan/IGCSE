export const partA = {
  "1.1": {
    id: "1.1",
    file: "1-1-number-systems.html",
    title: "Number systems",
    paper: "Paper 1 · Computer systems",
    chapter: "1 Data representation",
    lede: "Every value a computer processes is binary, because logic gates and registers only deal in 0 and 1. People also write those values in denary and hexadecimal. This topic is conversions in both directions, 8-bit addition, overflow, logical shifts, and two’s complement.",
    mapTitle: "Six things topic 1.1 asks for",
    mapLede: "The left-hand skill and the right-hand notes are both taught under each card. Values in this topic are integers. Binary answers are at most 16 bits, except where a question fixes the register at 8 bits.",
    map: [
      ["#binary", "1.1.1", "Why binary", "All data is converted to binary before a computer can process it."],
      ["#bases", "1.1.2", "Three bases", "Denary, binary and hexadecimal, converted in either direction."],
      ["#hex", "1.1.3", "Why hexadecimal", "A shorter form of binary that people can read more easily."],
      ["#add", "1.1.4", "Addition and overflow", "Add two positive 8-bit integers and explain a result above 255."],
      ["#shifts", "1.1.5", "Logical shifts", "Left and right, one place or several. Bits that fall off are lost."],
      ["#twos", "1.1.6", "Two’s complement", "Positive and negative 8-bit integers, from −128 to 127."],
    ],
    sections: [
      {
        id: "binary",
        kicker: "1.1.1",
        title: "Why every form of data becomes binary",
        lede: "Text, sound, images and numbers do not stay in the form a person typed. They are converted before the computer can do anything with them.",
        prose: [
          "A computer is built from logic gates. A gate’s inputs and output are only 0 or 1, so the circuits cannot process a letter, a colour or a denary number directly. The data is stored in registers, which are rows of bits. That is why every form of data is represented in binary before it is processed.",
          "The later topics show the conversion for text, sound and images. This topic is about the numbers themselves: how to write them, how to calculate with an 8-bit register, and how a pattern of eight bits can mean a negative value.",
        ],
        pair: {
          able: ["Understand how and why computers use binary to represent all forms of data."],
          notes: [
            "Any form of data needs to be converted to binary to be processed by a computer.",
            "Data is processed using logic gates and stored in registers.",
          ],
        },
      },
      {
        id: "bases",
        kicker: "1.1.2",
        title: "Denary, binary and hexadecimal",
        lede: "The base tells you what a column is worth. Conversions are asked in both directions, and the binary value will be no longer than 16 bits.",
        prose: [
          "Denary is base 10. Each column is worth ten times the column on its right: ones, tens, hundreds. Binary is base 2, so the columns are ones, twos, fours, eights, and so on. Hexadecimal is base 16. After 9 the digits are A, B, C, D, E and F, standing for 10 to 15.",
          "One hexadecimal digit is exactly four bits. That is why conversion between hex and binary is a grouping job, not a new calculation. Sixteen bits is the longest binary value in this topic, which is four hex digits, from 0 to FFFF, or 0 to 65535 in denary.",
        ],
        pair: {
          able: [
            "Understand the denary, binary and hexadecimal number systems.",
            "Convert positive denary and positive binary, positive denary and positive hexadecimal, and positive hexadecimal and positive binary.",
          ],
          notes: [
            "Denary is base 10, binary is base 2, and hexadecimal is base 16.",
            "Values used are integers only.",
            "Conversions are in both directions, for example denary to binary or binary to denary.",
            "The maximum binary number length is 16 bits.",
          ],
        },
        table: {
          title: "The same value in three bases",
          head: ["Denary", "Binary", "Hexadecimal", "Why the columns work"],
          rows: [
            ["26", "11010", "1A", "16 + 8 + 2, and one group of 16 plus 10"],
            ["255", "11111111", "FF", "Eight 1s, or 15 × 16 + 15"],
            ["10", "1010", "A", "A single hex digit replaces four bits"],
          ],
          note: "Write binary in groups of four when you are converting to hex. Pad the left with zeros so the groups are complete: 11010 is 0001 1010.",
        },
        walk: {
          title: "Worked conversion: 26, both ways",
          steps: [
            { label: "Denary to binary.", text: "Subtract the largest power of two that fits. 16 leaves 10, 8 leaves 2, 2 leaves 0. The columns used are 16, 8 and 2, so the bits are 11010." },
            { label: "Binary to hex.", text: "Group 0001 1010. 0001 is 1 and 1010 is 10, which is written A. The hex value is 1A." },
            { label: "Hex back to denary.", text: "1 × 16 + 10 = 26. The three forms are the same integer." },
          ],
          result: "A question can start from any of the three. Do the reverse of the method above, and stop at 16 bits.",
        },
      },
      {
        id: "hex",
        kicker: "1.1.3",
        title: "Why people use hexadecimal",
        lede: "Hexadecimal does not store a different value. It is a shorter way to write binary, so a person can read it with fewer mistakes.",
        prose: [
          "A MAC address, a colour such as #1A2B3C, a memory dump and an error code are all long binary patterns. Writing them in hex cuts the number of digits to a quarter, because four bits become one digit. The computer still stores the bits. The hex form is for people.",
          "You should be able to name those uses, and to say that hex is easier for humans to understand because it is a shorter representation of binary. Do not say that hex holds more data than binary. The value is the same.",
        ],
        pair: {
          able: ["Understand how and why hexadecimal is used as a beneficial method of data representation."],
          notes: [
            "Identify areas of computer science where hexadecimal is used.",
            "Hexadecimal is easier for humans to understand than binary, because it is a shorter representation of binary.",
          ],
        },
        columns: [
          { title: "Where you will see it", points: ["HTML and image colours, written as pairs of hex digits.", "MAC addresses, which are given to a network interface at manufacture.", "Memory dumps, where the contents of memory are shown to a person.", "Error codes, which are shorter to read and to quote than a string of bits."] },
          { title: "What earns the mark", points: ["One hex digit stands for four bits, so the written form is shorter.", "People misread a long binary string more easily than they misread hex.", "The computer has not changed number systems. The bits in the register are still binary."] },
        ],
        exam: "“Hex stores more than binary” does not score. The benefit is for the reader: the same bits, written with fewer digits.",
      },
      {
        id: "add",
        kicker: "1.1.4",
        title: "Adding two positive 8-bit integers",
        lede: "Add the bits from the right, exactly as in denary, but the only digits are 0 and 1. A carry happens whenever a column reaches 2.",
        prose: [
          "0 + 0 is 0. 0 + 1 is 1. 1 + 1 is 0 and a carry of 1. 1 + 1 + a carry is 1 and a carry of 1. The register has eight places. If the true sum needs a ninth bit, that bit cannot be stored.",
          "An 8-bit register can represent 0 to 255. If the value that should be returned is greater than 255, an overflow error has occurred. A device can have a different predefined limit, for example 16 bits. Overflow is the same idea at any of those limits: the result is outside the range the register can hold.",
        ],
        pair: {
          able: [
            "Add two positive 8-bit binary integers.",
            "Understand the concept of overflow and why it occurs in binary addition.",
          ],
          notes: [
            "An overflow error will occur if the value is greater than 255 in an 8-bit register.",
            "A computer or device has a predefined limit that it can represent or store, for example 16-bit.",
            "An overflow error occurs when a value outside this limit should be returned.",
          ],
        },
        walk: {
          title: "Worked addition: 11111111 + 00000001",
          steps: [
            { label: "The denary values.", text: "11111111 is 255 and 00000001 is 1. The true sum is 256." },
            { label: "The binary sum.", text: "Every column is 1 + 0 plus a carry that ripples from the right. The full result is 100000000, which is nine bits." },
            { label: "What the register keeps.", text: "Only eight bits fit, so it stores 00000000. The ninth bit is the sign that the result was outside the limit." },
          ],
          result: "Say both parts in an answer: the stored pattern is 00000000, and an overflow has occurred because 256 is greater than 255.",
        },
        exam: "Writing 256, or 100000000, as the contents of the 8-bit register misses the point. The register cannot hold that value.",
      },
      {
        id: "shifts",
        kicker: "1.1.5",
        title: "Logical shifts on a positive 8-bit integer",
        lede: "A logical shift moves every bit the same way. Zeros enter at the empty end. Bits that fall off the other end are lost, and a lost 1 changes the value.",
        prose: [
          "A left shift moves each bit one place towards the most significant end. A zero enters at the right. Each place multiplies a positive integer by 2, but only while the bit that falls off is 0. If a 1 is shifted out, the stored result is no longer the exact multiple.",
          "A right shift moves towards the least significant end. A zero enters at the left. Each place divides the positive integer by 2, and a 1 shifted out is the remainder that has been lost. You can be asked for one place or for several places. Repeat the same move.",
        ],
        pair: {
          able: ["Perform a logical binary shift on a positive 8-bit binary integer and understand the effect on that integer."],
          notes: [
            "Perform logical left shifts and logical right shifts, including multiple shifts.",
            "Bits shifted from the end of the register are lost, and zeros are shifted in at the opposite end.",
            "The positive binary integer is multiplied or divided according to the shift performed.",
            "The most significant bit or bits, or the least significant bit or bits, are lost.",
          ],
        },
        walk: {
          title: "Worked shifts of 00001100, which is denary 12",
          steps: [
            { label: "One place left.", text: "00011000. The bit lost was 0. Denary 24, which is 12 × 2." },
            { label: "Two places left.", text: "00110000. Denary 48, which is 12 × 4. Still exact, because only zeros have been lost." },
            { label: "One place right.", text: "00000110. The bit lost was 0. Denary 6, which is 12 ÷ 2." },
            { label: "A shift that loses a 1.", text: "00001101 shifted right once is 00000110. The original was 13. The stored result is 6, not 6.5, because the least significant 1 has been lost." },
          ],
          result: "State the new bit pattern, the denary value, and whether a significant bit was lost.",
        },
      },
      {
        id: "twos",
        kicker: "1.1.6",
        title: "Two’s complement for positive and negative integers",
        lede: "The same eight bits can mean 0 to 255, or they can mean −128 to 127. Two’s complement is the second reading. The left-most bit is the sign.",
        prose: [
          "A positive number uses the same bits as ordinary binary, and the sign bit is 0. The largest positive value is 01111111, which is 127. A negative number has a sign bit of 1. The most negative value is 10000000, which is −128.",
          "To write a negative denary integer, start from the positive binary, invert every bit, then add 1. To read a negative pattern, either reverse those steps or subtract 256 from the ordinary denary value of the bits. You need both directions: denary or binary into an 8-bit two’s complement pattern, and the pattern back to denary, for positive and for negative values.",
        ],
        pair: {
          able: ["Use the two’s complement number system to represent positive and negative 8-bit binary integers."],
          notes: [
            "Convert a positive binary or denary integer to a two’s complement 8-bit integer and vice versa.",
            "Convert a negative binary or denary integer to a two’s complement 8-bit integer and vice versa.",
          ],
        },
        walk: {
          title: "Worked values: +5 and −5",
          steps: [
            { label: "+5.", text: "00000101. The sign bit is 0, so the ordinary binary reading is already the value." },
            { label: "Invert.", text: "11111010." },
            { label: "Add 1.", text: "11111011. That pattern is −5." },
            { label: "Read it back.", text: "The bits as an ordinary number are 251. Because the sign bit is 1, the signed value is 251 − 256 = −5." },
          ],
          result: "The range of an 8-bit two’s complement integer is −128 to 127. 128 cannot be stored: 10000000 is already −128.",
        },
        exam: "Do not treat the sign bit as a separate minus sign stuck in front of the other seven bits. 10000101 is not −5. −5 is 11111011.",
      },
    ],
    lab: "numbers",
    mcqs: [
      { q: "Why does a computer use binary for every kind of data?", options: ["Hexadecimal cannot be stored", "Data is processed by logic gates and stored in registers", "Denary has only two digits", "Overflow only happens in denary"], answer: 1, why: "Any data must become binary before the computer can process it." },
      { q: "Why is hexadecimal useful?", options: ["It stores more data than binary", "It is a shorter way to write binary and is easier for people to read", "It removes the need for registers", "It prevents overflow"], answer: 1, why: "One hex digit replaces four bits. The value is the same." },
      { q: "11111111 + 00000001 is stored in an 8-bit register. What happens?", options: ["The register stores 256", "The register stores 00000000 and an overflow has occurred", "The register stores 11111110", "The addition cannot be started"], answer: 1, why: "The true sum is 256, which is 100000000 in binary. Only eight bits are kept." },
      { q: "A logical right shift of a positive integer by one place does what?", options: ["Multiplies it by 2", "Divides it by 2, and loses the bit that shifts out", "Changes the sign bit only", "Converts it to hexadecimal"], answer: 1, why: "A zero enters on the left and the right-most bit is lost." },
    ],
    checks: [
      "I can convert between denary, binary and hexadecimal in either direction, up to 16 bits.",
      "I can explain overflow in an 8-bit addition, and that a device has a predefined limit.",
      "I can perform a logical left or right shift, including several places, and say which bits are lost.",
      "I can read and write a positive or negative 8-bit two’s complement integer.",
    ],
  },
  "1.2": {
    id: "1.2",
    file: "1-2-text-sound-images.html",
    title: "Text, sound and images",
    paper: "Paper 1 · Computer systems",
    chapter: "1 Data representation",
    lede: "Text, sound and images are converted to binary so that logic gates can process them. The character set, the sample rate, the sample resolution, the image resolution and the colour depth decide what can be represented and how large the file becomes.",
    mapTitle: "Three representations",
    map: [
      ["#text", "1.2.1", "Text", "Character sets turn characters into binary codes. Unicode covers more than ASCII and uses more bits."],
      ["#sound", "1.2.2", "Sound", "A wave is sampled. Rate and resolution both raise accuracy and file size."],
      ["#images", "1.2.3", "Images", "Pixels and colour depth. More of either raises quality and file size."],
    ],
    sections: [
      {
        id: "text",
        kicker: "1.2.1",
        title: "How text becomes a binary code",
        lede: "A computer does not store the shape of a letter. It stores a number for that character, and the character set is the agreed list of those numbers.",
        prose: [
          "The text you type is converted to binary before it can be processed. American Standard Code for Information Interchange, ASCII, gives a code to English letters, digits and the basic symbols. The set is small, so each character can be stored in a short binary pattern.",
          "Unicode keeps that idea and extends the list. It includes other languages, extra symbols and emoji. A larger list needs more bits for each character, so the same sentence can take more storage when it is saved as Unicode than when it is saved as ASCII. The extra bits are the cost of being able to represent the larger range.",
        ],
        pair: {
          able: ["Understand how and why a computer represents text, and the use of character sets, including ASCII and Unicode."],
          notes: [
            "Text is converted to binary to be processed by a computer.",
            "Unicode allows a greater range of characters and symbols than ASCII, including different languages and emoji.",
            "Unicode requires more bits per character than ASCII.",
          ],
        },
        columns: [
          { title: "ASCII", points: ["A defined code for each character in a limited set.", "Enough for English letters, digits and common symbols.", "Fewer bits per character, so a smaller file for that limited text."] },
          { title: "Unicode", points: ["Many more codes: other writing systems, symbols and emoji.", "More bits per character than ASCII.", "The same English sentence does not become more detailed. It just uses a wider code."] },
        ],
        exam: "“Unicode is compressed ASCII” is the wrong way round. Unicode uses more bits per character so that more characters exist.",
      },
      {
        id: "sound",
        kicker: "1.2.2",
        title: "Sampling a sound wave",
        lede: "Sound is a continuous wave. A computer stores a sequence of measurements of that wave. Two settings control how faithful the recording is.",
        prose: [
          "The wave is sampled so that it can be converted to binary and processed. The sample rate is how often the measurement is taken: the number of samples in one second. A higher rate follows the shape of the wave more closely.",
          "The sample resolution is how precisely each measurement is stored: the number of bits per sample. More bits mean smaller steps between the quietest and loudest value that can be recorded. Raising either setting increases the accuracy of the recording. Both also increase the file size, because more numbers, or longer numbers, have to be stored.",
        ],
        pair: {
          able: ["Understand how and why a computer represents sound, including the effects of the sample rate and sample resolution."],
          notes: [
            "A sound wave is sampled so that sound can be converted to binary and processed by a computer.",
            "The sample rate is the number of samples taken in a second.",
            "The sample resolution is the number of bits per sample.",
            "The accuracy of the recording and the file size increase as the sample rate and resolution increase.",
          ],
        },
        walk: {
          title: "What to say if a question changes one setting",
          lede: "Name the setting, then give both effects. A one-sided answer loses the second mark.",
          steps: [
            { label: "Sample rate up.", text: "More samples are taken each second, so the recording follows the wave more accurately. The file is larger because those extra samples are stored." },
            { label: "Sample resolution up.", text: "Each sample uses more bits, so the amplitude is measured more precisely. The file is larger because every sample is longer." },
            { label: "Either setting down.", text: "The recording is less accurate and the file is smaller. Do not claim that one setting changes the other." },
          ],
        },
      },
      {
        id: "images",
        kicker: "1.2.3",
        title: "Pixels, resolution and colour depth",
        lede: "An image is a grid of pixels. Each pixel is stored as a binary colour. The grid and the colour code are the two settings.",
        prose: [
          "The picture is converted to binary, pixel by pixel, so the computer can process it. The resolution is the number of pixels in the image. More pixels can show finer detail, and they take more storage.",
          "The colour depth is the number of bits used to represent each colour. The number of different colours available is 2 to the power of the colour depth. One bit gives 2 colours, often black and white. Eight bits give 256 colours. Increasing the colour depth increases the quality of the image and the size of the file, because every pixel stores a longer code.",
        ],
        pair: {
          able: ["Understand how and why a computer represents an image, including the effects of the resolution and colour depth."],
          notes: [
            "An image is a series of pixels that are converted to binary, which is processed by a computer.",
            "The resolution is the number of pixels in the image.",
            "The colour depth is the number of bits used to represent each colour.",
            "The file size and quality of the image increase as the resolution and colour depth increase.",
          ],
        },
        table: {
          title: "Colour depth and the number of colours",
          head: ["Bits per pixel", "Colours", "What it is enough for"],
          rows: [
            ["1", "2", "Two colours, such as black and white"],
            ["2", "4", "A very small palette"],
            ["4", "16", "Simple graphics"],
            ["8", "256", "A full palette of 256 colours"],
          ],
          note: "Calculate 2 to the power of the colour depth. Do not multiply the depth by 2.",
        },
        note: "Resolution and colour depth are independent. A question can change one and leave the other alone. Say which one changed, and mention both quality and file size.",
      },
    ],
    lab: "media",
    sort: {
      title: "What increases?",
      lede: "Choose what gets better, and remember the file size.",
      done: "Higher settings store more detail, and they also store more bits.",
      choices: [["detail", "More detail"], ["size", "Larger file"], ["both", "Both"]],
      cards: [
        { text: "A higher sample rate", answer: "both", why: "More samples per second follow the wave more closely, and each extra sample is stored.", miss: "Accuracy and file size both increase." },
        { text: "A higher sample resolution", answer: "both", why: "Each sample is measured more precisely, using more bits.", miss: "Both the recording and the file size change." },
        { text: "A higher image resolution", answer: "both", why: "More pixels show more detail and take more bits.", miss: "Resolution affects quality and size." },
        { text: "Using Unicode instead of ASCII for the same English sentence", answer: "size", why: "The sentence does not gain sound or picture detail. Unicode simply uses more bits per character.", miss: "The syllabus point here is the extra bits per character." },
      ],
    },
    mcqs: [
      { q: "What is the sample rate?", options: ["The number of bits in each sample", "The number of samples taken in one second", "The number of pixels in an image", "The number of characters in ASCII"], answer: 1, why: "Sample resolution is the bits per sample. Sample rate is how often the wave is measured." },
      { q: "Why can Unicode represent more characters than ASCII?", options: ["It uses fewer bits per character", "It uses more bits per character, so there are more possible codes", "It stores sound instead of text", "It compresses every character"], answer: 1, why: "A longer code gives a larger set of characters, languages and symbols." },
      { q: "An image uses a colour depth of 3 bits. How many colours can each pixel be?", options: ["3", "6", "8", "9"], answer: 2, why: "2 to the power of 3 is 8." },
      { q: "What happens when the colour depth of an image is increased?", options: ["The file becomes smaller and less accurate", "The file size and the quality both increase", "The resolution must fall", "The image becomes a sound file"], answer: 1, why: "More bits per pixel can represent more colours, and those bits are stored." },
    ],
    checks: [
      "I can explain why text, sound and images are converted to binary.",
      "I can state the difference between ASCII and Unicode, including bits per character.",
      "I can define sample rate and sample resolution, and the effect of raising each.",
      "I can define image resolution and colour depth, and calculate the number of colours.",
    ],
  },
  "1.3": {
    id: "1.3",
    file: "1-3-data-storage-compression.html",
    title: "Data storage and compression",
    paper: "Paper 1 · Computer systems",
    chapter: "1 Data representation",
    lede: "Storage is measured in powers of 1024, not 1000. An image file size comes from the resolution and the colour depth. A sound file size comes from the sample rate, the resolution and the length. Compression makes a file smaller, either by discarding data or by recording a pattern more efficiently.",
    mapTitle: "Measuring and compressing",
    map: [
      ["#units", "1.3.1", "Units", "Bit, nibble, byte, then KiB through EiB. Each step is 1024 of the one before, except the small units."],
      ["#sizes", "1.3.2", "File sizes", "Calculate an image or a sound file from the values the question gives."],
      ["#purpose", "1.3.3", "Why compress", "Less storage, less bandwidth, shorter transmission time."],
      ["#methods", "1.3.4", "Lossy and lossless", "Lossy removes data permanently. Run-length encoding does not."],
    ],
    sections: [
      {
        id: "units",
        kicker: "1.3.1",
        title: "From a bit to an exbibyte",
        lede: "Name the unit, and know how many of the previous unit it contains. The answer must use the unit written in the question.",
        prose: [
          "A bit is a single 0 or 1. A nibble is 4 bits. A byte is 8 bits. After that, this course uses the binary prefixes. A kibibyte is 1024 bytes. A mebibyte is 1024 kibibytes. A gibibyte is 1024 mebibytes. The same ×1024 step continues through tebibyte, pebibyte and exbibyte.",
          "The names look like kilobyte and megabyte, but the multiplier here is 1024, not 1000. A calculation that divides by 1000 is wrong for this syllabus even when the number looks close.",
        ],
        pair: {
          able: ["Understand how data storage is measured."],
          notes: [
            "The units include bit, nibble, byte, kibibyte (KiB), mebibyte (MiB), gibibyte (GiB), tebibyte (TiB), pebibyte (PiB) and exbibyte (EiB).",
            "Know how many of the previous unit each one contains, for example 8 bits in a byte and 1024 mebibytes in a gibibyte.",
            "Answers must be given in the units specified, and calculations must use 1024 rather than 1000.",
          ],
        },
        table: {
          title: "How many of the previous unit",
          head: ["Unit", "Contains", "Rough idea"],
          rows: [
            ["1 nibble", "4 bits", "One hex digit"],
            ["1 byte", "8 bits", "One ASCII-sized character, as a rule of thumb"],
            ["1 KiB", "1024 bytes", "A short text file"],
            ["1 MiB", "1024 KiB", "A large photo or a short sound"],
            ["1 GiB", "1024 MiB", "A film, or many songs"],
            ["1 TiB", "1024 GiB", "A large drive"],
            ["1 PiB", "1024 TiB", "The next step up"],
            ["1 EiB", "1024 PiB", "The largest unit in the list"],
          ],
        },
      },
      {
        id: "sizes",
        kicker: "1.3.2",
        title: "Calculating an image file and a sound file",
        lede: "Multiply the values the question gives you. Do not invent a sample rate for an image, or a colour depth for a sound.",
        prose: [
          "An image file, before any compression, is the number of pixels multiplied by the colour depth. The number of pixels is the resolution. If the question gives width and height, multiply those together first. The result is in bits. Divide by 8 for bytes, then by 1024 for kibibytes, and by 1024 again if the question asks for mebibytes.",
          "A sound file is the sample rate multiplied by the sample resolution multiplied by the length of the track in seconds. If the question also gives a number of channels, multiply by that too. If it does not, use one channel. Again the product is in bits, and you convert to the unit the question names.",
        ],
        pair: {
          able: ["Calculate the file size of an image file and a sound file, using the information given."],
          notes: [
            "Image information is the resolution and the colour depth.",
            "Sound information is the sample rate, the resolution and the length of the track.",
            "Give the answer in the units specified, using 1024 rather than 1000.",
          ],
        },
        walk: {
          title: "Worked image: 200 by 100 pixels, 16-bit colour, answer in kibibytes",
          steps: [
            { label: "Pixels.", text: "200 × 100 = 20 000 pixels." },
            { label: "Bits.", text: "20 000 × 16 = 320 000 bits." },
            { label: "Bytes.", text: "320 000 ÷ 8 = 40 000 bytes." },
            { label: "Kibibytes.", text: "40 000 ÷ 1024 = 39.0625 KiB. Do not divide by 1000 and call the result 40 kilobytes." },
          ],
          result: "A 30-second mono sound at 44 100 samples per second and 16 bits is 44 100 × 16 × 30 bits. Divide by 8, then by 1024, if the question asks for KiB.",
        },
      },
      {
        id: "purpose",
        kicker: "1.3.3",
        title: "Why a file is compressed",
        lede: "Compression reduces the size of a file. The smaller file is easier to store and quicker to send.",
        prose: [
          "A photograph or a song can be too large for the storage available, or too large to send in a reasonable time. Compression exists to reduce that size. The impact is practical: the file needs less storage space, it needs less bandwidth while it is being transmitted, and the transmission takes less time.",
          "Those three consequences are the ones to quote. Compression does not change the meaning of the bits by itself. Whether the original can be restored depends on which method was used, which is the next section.",
        ],
        pair: {
          able: ["Understand the purpose of and need for data compression."],
          notes: [
            "Compression exists to reduce the size of the file.",
            "The impact includes less bandwidth, less storage space and a shorter transmission time.",
          ],
        },
      },
      {
        id: "methods",
        kicker: "1.3.4",
        title: "Lossy compression and lossless compression",
        lede: "Both methods make a smaller file. The difference is whether the discarded detail can be put back.",
        prose: [
          "Lossy compression reduces the file size by permanently removing data. Lowering the resolution or the colour depth of an image does that. Lowering the sample rate or the sample resolution of a sound does it too. The file is smaller because some of the original measurements have gone, and they cannot be calculated back into existence.",
          "Lossless compression reduces the file size without permanent loss of data. Run-length encoding is the example you must be able to describe. A run of identical values is stored as a count and the value, instead of storing the value again and again. Decoding repeats the value the right number of times, so the original is restored.",
        ],
        pair: {
          able: ["Understand how files are compressed using lossy and lossless compression methods."],
          notes: [
            "Lossy compression permanently removes data, for example by reducing resolution or colour depth, or reducing sample rate or sample resolution.",
            "Lossless compression does not permanently lose data. Run-length encoding (RLE) is the example.",
          ],
        },
        walk: {
          title: "Worked run-length encoding",
          lede: "The text AAAABBBCC is only a stand-in for a row of identical pixels or samples.",
          steps: [
            { label: "Find the runs.", text: "A repeats 4 times, B repeats 3 times, C repeats 2 times." },
            { label: "Store counts.", text: "4A 3B 2C. Nine values have become three pairs." },
            { label: "Decode.", text: "Write A four times, B three times and C twice. The original is back, so nothing was permanently removed." },
          ],
          result: "RLE helps when neighbours are the same. A picture where every pixel is different can become larger, because each pixel gains a count.",
        },
        exam: "“Lossy is bad and lossless is good” is not an explanation. Say what is removed, and whether it can be restored.",
      },
    ],
    lab: "files",
    mcqs: [
      { q: "How many bytes are in a kibibyte?", options: ["1000", "1024", "8", "512"], answer: 1, why: "The syllabus uses 1024, not 1000." },
      { q: "A sound file’s size is calculated from which three values, unless a question adds another?", options: ["Width, height and colour depth", "Sample rate, sample resolution and length", "Bit, nibble and byte", "ASCII, Unicode and pixels"], answer: 1, why: "Width, height and colour depth belong to an image." },
      { q: "Which description is lossy compression?", options: ["The file is smaller and the removed detail cannot be restored", "The file is smaller and the original data can be restored", "The file is copied onto a second disk", "The file is converted from denary to binary"], answer: 0, why: "Lossy methods permanently discard data. Lossless methods do not." },
      { q: "What does run-length encoding store for a run of identical values?", options: ["Every value again", "A count and the value that repeats", "Only the first pixel of the image", "A new sample rate"], answer: 1, why: "AAAA can be stored as 4 A. Decoding rebuilds AAAA, so the method is lossless." },
    ],
    checks: [
      "I can list the storage units from bit to exbibyte and use 1024.",
      "I can calculate an image file size from resolution and colour depth.",
      "I can calculate a sound file size from sample rate, resolution and length.",
      "I can explain the need for compression, then lossy compression, lossless compression and run-length encoding.",
    ],
  },
  "2.1": {
    id: "2.1",
    file: "2-1-data-transmission.html",
    title: "Types and methods of data transmission",
    paper: "Paper 1 · Computer systems",
    chapter: "2 Data transmission",
    lede: "A message is broken into packets. Each packet can take a different route, and the receiver puts them back in order. The direction of travel and the number of wires then decide which method suits a situation. USB is a serial interface with clear benefits and limits.",
    mapTitle: "Packets, methods and USB",
    map: [
      ["#packets", "2.1.1", "Packets", "Header, payload and trailer, then how packet switching uses them."],
      ["#methods", "2.1.2", "Methods", "Serial or parallel, and simplex, half-duplex or full-duplex, with a reason for each."],
      ["#usb", "2.1.3", "USB", "How the interface transmits data, and its benefits and drawbacks."],
    ],
    sections: [
      {
        id: "packets",
        kicker: "2.1.1",
        title: "Packets and packet switching",
        lede: "A large file is not sent as one continuous stream. It is broken into packets so that each piece can be routed on its own.",
        prose: [
          "Each packet has three parts. The header holds the destination address, the packet number and the originator’s address. The payload is the data itself. The trailer is used for checks, such as the error detection in the next topic.",
          "A router controls the route a packet takes. Packets from the same message can travel by different routes, so they may arrive out of order. The packet number is what lets the receiver put them back. Once the last packet has arrived, the packets are reordered into the original message.",
        ],
        pair: {
          able: [
            "Understand that data is broken down into packets to be transmitted.",
            "Describe the structure of a packet.",
            "Describe the process of packet switching.",
          ],
          notes: [
            "A packet contains a packet header, a payload and a trailer.",
            "The header includes the destination address, the packet number and the originator’s address.",
            "Each packet could take a different route. A router controls that route.",
            "Packets may arrive out of order. Once the last packet has arrived, they are reordered.",
          ],
        },
        walk: {
          title: "One message, three packets",
          steps: [
            { label: "Split.", text: "The file becomes packet 1, packet 2 and packet 3. Each header has the same destination and sender, and its own packet number." },
            { label: "Route.", text: "Packet 1 goes through router A. Packet 2 goes through router B and arrives first. Packet 3 is delayed." },
            { label: "Rebuild.", text: "When packet 3 finally arrives, the receiver sorts them as 1, then 2, then 3, using the packet numbers." },
          ],
          result: "The payload is not the header. A question that asks for two items in the header wants addresses and the packet number, not the data.",
        },
      },
      {
        id: "methods",
        kicker: "2.1.2",
        title: "Choosing how the bits travel",
        lede: "Serial and parallel describe how many bits move at once. Simplex, half-duplex and full-duplex describe the direction. A scenario question wants the method and the reason.",
        prose: [
          "Serial transmission sends one bit after another down a single channel. The cable is simpler and the bits cannot get out of step with each other, so it stays reliable over a longer distance. It sends fewer bits in each tick of the clock than parallel transmission.",
          "Parallel transmission sends several bits at the same time, one on each wire. Over a very short distance that can move data faster. Over a long cable the bits can arrive at different times, which is called skew, and the wires can interfere with each other. The cable also costs more because there are more wires.",
          "Simplex is one direction only, for example a sensor that only reports readings. Half-duplex uses both directions, but only one at a time, like a walkie-talkie. Full-duplex uses both directions at the same time, like a telephone call. Half-duplex shares one channel and so the two sides must take turns. Full-duplex needs the capacity for both directions together.",
        ],
        pair: {
          able: [
            "Describe how data is transmitted using different methods.",
            "Explain the suitability of each method for a given scenario.",
          ],
          notes: [
            "The methods are serial, parallel, simplex, half-duplex and full-duplex.",
            "Include the advantages and disadvantages of each method.",
          ],
        },
        columns: [
          { title: "Serial", points: ["One bit at a time on one channel.", "Reliable over longer distances, and a simpler cable.", "Fewer bits are sent at each moment than in parallel."] },
          { title: "Parallel", points: ["Several bits at the same time on several wires.", "Can be faster over a short distance.", "Skew and cost make it a poor choice for a long cable."] },
          { title: "Direction", points: ["Simplex: one direction only. Simple, but there is no reply.", "Half-duplex: both directions, one at a time.", "Full-duplex: both directions at the same time. More capacity is needed."] },
        ],
      },
      {
        id: "usb",
        kicker: "2.1.3",
        title: "The universal serial bus",
        lede: "USB transmits data serially. The interface is standard enough that many devices can use the same port, and it has limits you should be able to name.",
        prose: [
          "When a USB device is plugged in, the computer detects it and can load the driver it needs. Bits travel one after another, which is why it is a serial interface. The port can also supply power to a device, so a small peripheral may not need its own supply.",
          "The benefits are that it is a common standard, devices are recognised when connected, and the same port can carry data and power. Later versions transmit faster, and an older device can often still be used in a newer port. The drawbacks are a limited cable length and a transmission speed that depends on the version: an older USB connection is slower. A device can also need more power than the port supplies.",
        ],
        pair: {
          able: ["Understand the universal serial bus (USB) interface and explain how it is used to transmit data."],
          notes: ["Include the benefits and drawbacks of the interface."],
        },
        exam: "Calling USB parallel because the connector has several pins misses the transmission method. The data bits are sent serially.",
      },
    ],
    sort: {
      title: "Which method fits?",
      done: "Match the direction and the distance to the method.",
      choices: [["serial", "Serial"], ["parallel", "Parallel"], ["full", "Full-duplex"], ["half", "Half-duplex"]],
      cards: [
        { text: "One bit at a time, over a long cable", answer: "serial", why: "Serial uses one channel and avoids the skew that parallel cables suffer over distance.", miss: "Several bits at once would be parallel." },
        { text: "Several bits at once, across a very short connection inside a device", answer: "parallel", why: "Parallel uses several wires. The short distance limits the problem of bits arriving at different times.", miss: "One bit after another is serial." },
        { text: "Two people speak and hear each other at the same time", answer: "full", why: "Full-duplex carries data in both directions at once.", miss: "Half-duplex would make them take turns." },
        { text: "A walkie-talkie: each person talks, then listens", answer: "half", why: "Both directions are possible, but not together.", miss: "Simplex would allow only one of those directions." },
      ],
    },
    mcqs: [
      { q: "Which item is stored in a packet header?", options: ["The payload only", "The destination address, packet number and sender’s address", "The colour depth", "The sample rate"], answer: 1, why: "The payload is separate from the header. The packet number lets the receiver reorder the packets." },
      { q: "What does a router do during packet switching?", options: ["It draws the web page", "It chooses the route a packet takes", "It converts text to Unicode", "It stores the file permanently"], answer: 1, why: "Different packets can be sent along different routes." },
      { q: "Packets from one file arrive out of order. What happens next?", options: ["The file is discarded at once", "They are reordered when transmission of the packets is complete", "They are stored as an image", "The router deletes the packet numbers"], answer: 1, why: "The packet numbers are used to rebuild the original order." },
      { q: "USB is best described as which kind of transmission?", options: ["Parallel and simplex only", "Serial", "A method that sends eight bits on eight wires", "Half-duplex inside every packet header"], answer: 1, why: "USB transmits bits one after another." },
    ],
    checks: [
      "I can name the header, payload and trailer, and say what the header stores.",
      "I can describe packet switching, including different routes and reordering.",
      "I can compare serial with parallel, and simplex with half-duplex and full-duplex, including a reason.",
      "I can explain USB transmission and give a benefit and a drawback.",
    ],
  },
  "2.2": {
    id: "2.2",
    file: "2-2-error-detection.html",
    title: "Methods of error detection",
    paper: "Paper 1 · Computer systems",
    chapter: "2 Data transmission",
    lede: "Interference can lose a bit, add a bit, or flip a bit while data is moving. Parity, a checksum, an echo check and ARQ look for that after transmission. A check digit looks for a mistake when a person types a number, such as an ISBN or a bar code.",
    mapTitle: "Five checks",
    map: [
      ["#need", "2.2.1", "Why check", "Interference causes data loss, data gain or data change."],
      ["#parity", "2.2.2", "Parity", "Odd or even, including a parity byte and a parity block."],
      ["#checksum", "2.2.2", "Checksum and echo", "Compare a total, or compare the data sent back."],
      ["#entry", "2.2.3", "Check digits", "Used on entry. Examples are ISBNs and bar codes."],
      ["#arq", "2.2.4", "ARQ", "Positive and negative acknowledgements, and a timeout."],
    ],
    sections: [
      {
        id: "need",
        kicker: "2.2.1",
        title: "Errors happen after the data has been sent",
        lede: "The sender can calculate a perfect check and the bits can still change on the way. The check has to be repeated by the receiver.",
        prose: [
          "Electrical interference can remove a bit, insert an extra bit, or change a 0 into a 1 or a 1 into a 0. Those three results are data loss, data gain and data change. Without a check, the receiver would treat the damaged bits as the real message.",
          "Error detection does not repair the original by magic. It gives the receiver a reason to notice the damage and, in some methods, to ask for the data again.",
        ],
        pair: {
          able: ["Understand the need to check for errors after data transmission and how these errors can occur."],
          notes: ["Errors during transmission are caused by interference, for example data loss, data gain and data change."],
        },
      },
      {
        id: "parity",
        kicker: "2.2.2",
        title: "Parity checks, including a byte and a block",
        lede: "The two sides agree on even or odd. A parity bit is chosen so that the whole pattern has that number of 1s.",
        prose: [
          "Count the 1s in the data. For even parity, the parity bit is 0 if the count is already even, and 1 if it is odd. For odd parity, choose the bit that makes the count odd. The receiver counts again. If the agreed parity is wrong, the byte has changed.",
          "A parity byte is an extra byte sent with a block of bytes. Each of its bits is a parity bit for that column, down the bytes. A parity block adds parity along each row and down each column. One flipped bit then fails its row and its column, which points at the intersection. Two errors in the same byte can leave a single parity bit looking correct, so a passed check is not proof that every bit is right.",
        ],
        pair: {
          able: ["Describe parity checks, both odd and even, including how a parity byte and a parity block are used."],
          notes: ["Include a parity byte and a parity block check."],
        },
        table: {
          title: "A tiny even-parity block",
          lede: "Three data bits in each row. The final column and the final row are the parity bits.",
          head: ["", "Bit 1", "Bit 2", "Bit 3", "Row parity"],
          rows: [
            ["Byte 1", "1", "0", "1", "0"],
            ["Byte 2", "1", "1", "0", "0"],
            ["Byte 3", "0", "1", "1", "0"],
            ["Column parity", "0", "0", "0", "0"],
          ],
          note: "Each row and each column has an even number of 1s. If Byte 2 bit 2 flipped to 0, that row and that column would both become odd, so the damaged bit can be found.",
        },
        walk: {
          title: "Worked even parity on 1010001",
          steps: [
            { label: "Count.", text: "The seven bits contain three 1s. Three is odd." },
            { label: "Choose the bit.", text: "Even parity needs one more 1, so the parity bit is 1." },
            { label: "Send.", text: "The byte is 10100011. The receiver counts four 1s and accepts it." },
            { label: "A hidden double error.", text: "If two bits in that byte both flip, the number of 1s can be even again. The check passes and the errors are missed." },
          ],
        },
      },
      {
        id: "checksum",
        kicker: "2.2.2",
        title: "Checksum and echo check",
        lede: "A checksum compares a calculated total. An echo check compares a copy of the data itself.",
        prose: [
          "Before transmission, the sender calculates a total from the values being sent. That total, the checksum, is sent as well. The receiver calculates the total from the values that arrived. If the two totals differ, the data changed or the checksum itself is wrong. A checksum can miss some combinations of errors that happen to add up to the same total.",
          "An echo check sends the received data back to the sender. The sender compares that copy with what it originally sent. If they differ, it sends the data again. The method uses extra transmission, and the copy on the way back can be damaged too, so a mismatch does not by itself say which copy is wrong.",
        ],
        pair: {
          able: ["Describe the processes involved in a checksum and an echo check."],
          notes: ["These checks detect errors in data after transmission."],
        },
      },
      {
        id: "entry",
        kicker: "2.2.3",
        title: "Check digits catch typing errors",
        lede: "A check digit is calculated from the other digits and stored as part of the number. It is used when data is entered, not while a packet is on a cable.",
        prose: [
          "The extra digit is worked out from the rest of the number by a fixed rule. When someone types the number, the check is calculated again. If it does not match, the number was probably typed incorrectly and should be rejected. This is a validation check. You will meet it again in topic 7.",
          "The examples you must be able to identify are international standard book numbers (ISBNs) and bar codes. Both carry a final digit that was calculated from the others. The activity on this page uses one simple classroom rule, a total divisible by 10. An ISBN uses its own published weighting. The idea is the same: an extra calculated digit, checked on entry.",
        ],
        pair: {
          able: ["Describe how a check digit is used to detect errors in data entry, and identify examples, including ISBNs and bar codes."],
          notes: ["Check digits are for data entry. Parity, checksums, echo checks and ARQ are for data after transmission."],
        },
        exam: "Do not describe a check digit as a parity bit. One is for a number a person enters. The other is for bits after transmission.",
      },
      {
        id: "arq",
        kicker: "2.2.4",
        title: "Automatic repeat query",
        lede: "ARQ uses an acknowledgement to decide whether the data has to be sent again.",
        prose: [
          "The receiver checks the data it has been sent. If the check passes, it returns a positive acknowledgement and the sender can move on. If the check fails, it returns a negative acknowledgement, and the sender transmits the data again.",
          "A request can also be lost, so the sender does not wait forever. If no acknowledgement arrives before a timeout, the sender transmits the data again. The three pieces to name are the positive acknowledgement, the negative acknowledgement and the timeout.",
        ],
        pair: {
          able: ["Describe how an automatic repeat query (ARQ) can be used to establish that data is received without error."],
          notes: ["Include positive and negative acknowledgements, and a timeout."],
        },
        walk: {
          title: "Three possible replies",
          steps: [
            { label: "Positive acknowledgement.", text: "The check passed. The sender does not repeat that data." },
            { label: "Negative acknowledgement.", text: "The check failed. The sender repeats the data." },
            { label: "Timeout.", text: "Nothing came back in time. The sender repeats the data, because it cannot tell whether the data or the reply was lost." },
          ],
        },
      },
    ],
    lab: "checks",
    mcqs: [
      { q: "Which error can interference cause during transmission?", options: ["A bit changes from 0 to 1", "A character is added to Unicode", "A pixel gains colour depth", "A register overflows"], answer: 0, why: "Interference can lose, add or change bits." },
      { q: "Even parity is being used. The seven data bits contain three 1s. What parity bit is added?", options: ["0, because three is odd", "1, so the byte has an even number of 1s", "3", "No bit is added"], answer: 1, why: "Three plus one makes four, which is even." },
      { q: "A check digit is used when?", options: ["A person enters a number such as an ISBN or a bar code", "A packet is routed", "A sound wave is sampled", "A file is stored in ROM"], answer: 0, why: "Check digits detect errors in data entry. Parity and checksums are used after transmission." },
      { q: "In ARQ, a timeout means what?", options: ["The checksum was correct", "An acknowledgement did not arrive in time, so the data is sent again", "The parity bit is removed", "The packet number is even"], answer: 1, why: "ARQ also uses a positive or negative acknowledgement." },
    ],
    checks: [
      "I can explain data loss, data gain and data change.",
      "I can work out an odd or even parity bit, and describe a parity byte and a parity block.",
      "I can describe a checksum and an echo check.",
      "I can describe a check digit, with ISBN and bar codes, and ARQ with acknowledgements and a timeout.",
    ],
  },
  "2.3": {
    id: "2.3",
    file: "2-3-encryption.html",
    title: "Encryption",
    paper: "Paper 1 · Computer systems",
    chapter: "2 Data transmission",
    lede: "Encryption scrambles data before it is transmitted so that someone who intercepts it cannot read it. Symmetric encryption uses one shared key. Asymmetric encryption uses a public key and a private key.",
    mapTitle: "Purpose, then the two key methods",
    map: [
      ["#purpose", "2.3.1", "Why encrypt", "The purpose is to keep transmitted data unreadable if it is intercepted."],
      ["#keys", "2.3.2", "Two methods", "One shared key, or a public key together with a private key."],
    ],
    sections: [
      {
        id: "purpose",
        kicker: "2.3.1",
        title: "Why transmitted data is encrypted",
        lede: "Data on a network can be intercepted. Encryption does not stop the interception. It stops the intercepted data from being understood.",
        prose: [
          "The original message is plaintext. Encryption uses a key to turn it into ciphertext, which looks meaningless. Decryption uses a key to turn the ciphertext back into the plaintext. The purpose is to protect data while it is being transmitted: passwords, payment details and private messages are typical examples.",
          "The key has to be managed. If the secret key is stolen or lost, the protection fails, because anyone with that key can reverse the encryption. Encryption is not compression, and it is not a parity check. The file is not being made smaller, and a flipped bit is not what it is looking for.",
        ],
        pair: {
          able: ["Understand the need for and purpose of encryption when transmitting data."],
          notes: ["Encryption is used so that intercepted data cannot be read without the correct key."],
        },
        exam: "Do not say that encryption hides the fact that a message was sent. Say that it keeps the contents unreadable if the transmission is intercepted.",
      },
      {
        id: "keys",
        kicker: "2.3.2",
        title: "Symmetric and asymmetric encryption",
        lede: "The difference is how many keys there are, and who is allowed to see them.",
        prose: [
          "Symmetric encryption uses the same key to encrypt and to decrypt. It is the faster of the two methods. Both sides need that secret, so the key itself has to be transmitted securely. If an eavesdropper sees the key, they can read every later message.",
          "Asymmetric encryption uses a pair. The public key encrypts the data and can be shared openly. The matching private key decrypts it and stays secret. A person can publish the public key, and anyone can use it to send them a message that only they can read. The method avoids sending the secret key. It takes more processing, so it is slower than symmetric encryption.",
        ],
        pair: {
          able: ["Understand how data is encrypted using symmetric and asymmetric encryption."],
          notes: ["Asymmetric encryption includes the use of public and private keys."],
        },
        columns: [
          { title: "Symmetric", points: ["One key encrypts and decrypts.", "Faster, so it suits large amounts of data.", "The shared key must be exchanged without being seen."] },
          { title: "Asymmetric", points: ["The public key encrypts. The private key decrypts.", "The public key can be shared. The private key cannot.", "Slower, but the secret key does not have to be sent."] },
        ],
        walk: {
          title: "Sending one message with a public key",
          steps: [
            { label: "Publish.", text: "The receiver gives out a public key and keeps the private key." },
            { label: "Encrypt.", text: "The sender uses that public key. The result is ciphertext." },
            { label: "Send.", text: "The ciphertext can be intercepted. Without the private key it cannot be read." },
            { label: "Decrypt.", text: "The receiver uses the private key and recovers the plaintext." },
          ],
          result: "Swapping the keys in the explanation loses the mark. The public key is the one that can be distributed.",
        },
      },
    ],
    sort: {
      title: "Symmetric or asymmetric?",
      done: "One shared key is symmetric. A public key and a private key are asymmetric.",
      choices: [["sym", "Symmetric"], ["asy", "Asymmetric"]],
      cards: [
        { text: "The same key is used to encrypt and to decrypt", answer: "sym", why: "That single shared key is symmetric encryption.", miss: "Asymmetric uses two different keys." },
        { text: "Anyone can use the public key to encrypt, and only the owner uses the private key to decrypt", answer: "asy", why: "The public key is shared. The private key is not.", miss: "A single shared secret would be symmetric." },
        { text: "The key itself must be transmitted securely to the other person", answer: "sym", why: "Both sides need the same secret, so exchanging it is the weak point.", miss: "A public key is designed to be shared." },
        { text: "It avoids sending the secret key, but it is slower", answer: "asy", why: "Asymmetric encryption solves the key exchange and costs more processing.", miss: "Speed is an advantage of the shared-key method." },
      ],
    },
    mcqs: [
      { q: "What is the purpose of encryption during transmission?", options: ["To make the file smaller", "To stop intercepted data from being read", "To add a parity bit", "To reorder packets"], answer: 1, why: "The data can still be captured. Without the key it cannot be understood." },
      { q: "Which statement describes symmetric encryption?", options: ["A public key encrypts and a private key decrypts", "One key is used for both encryption and decryption", "No key is used", "The checksum is the key"], answer: 1, why: "Symmetric means the same key on both sides." },
      { q: "In asymmetric encryption, which key is kept secret?", options: ["The public key", "The private key", "Both keys", "The packet number"], answer: 1, why: "The public key can be distributed. The private key stays with its owner." },
      { q: "Why might a system use symmetric encryption even though the key must be shared?", options: ["It is faster than asymmetric encryption", "It needs no key", "It is the same method as a parity check", "It only works on images"], answer: 0, why: "The comparison is speed against the problem of exchanging the key." },
    ],
    checks: [
      "I can explain why transmitted data is encrypted.",
      "I can describe symmetric encryption and the problem of sharing the key.",
      "I can describe the public key and the private key in asymmetric encryption.",
      "I can say which method is faster and which method avoids sending the secret key.",
    ],
  },
};
