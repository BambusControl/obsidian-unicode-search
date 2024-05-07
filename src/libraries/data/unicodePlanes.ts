import {UnicodePlane} from "../types/unicodePlane";

export const UNICODE_PLANE_0: UnicodePlane = {
    planeNumber: 0,
    description: "Basic Multilingual Plane",
    abbreviation: "BMP",
    interval: {
        start: 0x0000,
        end: 0xFFFF,
    },
    blocks: [
        {
            interval: {
                start: 0x0000,
                end: 0x007F,
            },
            description: "Basic Latin",
            plane: 0,
        },
        {
            interval: {
                start: 0x0080,
                end: 0x00FF,
            },
            description: "Latin-1 Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x0100,
                end: 0x017F,
            },
            description: "Latin Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0x0180,
                end: 0x024F,
            },
            description: "Latin Extended-B",
            plane: 0,
        },
        {
            interval: {
                start: 0x0250,
                end: 0x02AF,
            },
            description: "IPA Extensions",
            plane: 0,
        },
        {
            interval: {
                start: 0x02B0,
                end: 0x02FF,
            },
            description: "Spacing Modifier Letters",
            plane: 0,
        },
        {
            interval: {
                start: 0x0300,
                end: 0x036F,
            },
            description: "Combining Diacritical Marks",
            plane: 0,
        },
        {
            interval: {
                start: 0x0370,
                end: 0x03FF,
            },
            description: "Greek and Coptic",
            plane: 0,
        },
        {
            interval: {
                start: 0x0400,
                end: 0x04FF,
            },
            description: "Cyrillic",
            plane: 0,
        },
        {
            interval: {
                start: 0x0500,
                end: 0x052F,
            },
            description: "Cyrillic Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x0530,
                end: 0x058F,
            },
            description: "Armenian",
            plane: 0,
        },
        {
            interval: {
                start: 0x0590,
                end: 0x05FF,
            },
            description: "Hebrew",
            plane: 0,
        },
        {
            interval: {
                start: 0x0600,
                end: 0x06FF,
            },
            description: "Arabic",
            plane: 0,
        },
        {
            interval: {
                start: 0x0700,
                end: 0x074F,
            },
            description: "Syriac",
            plane: 0,
        },
        {
            interval: {
                start: 0x0750,
                end: 0x077F,
            },
            description: "Arabic Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x0780,
                end: 0x07BF,
            },
            description: "Thaana",
            plane: 0,
        },
        {
            interval: {
                start: 0x07C0,
                end: 0x07FF,
            },
            description: "NKo",
            plane: 0,
        },
        {
            interval: {
                start: 0x0800,
                end: 0x083F,
            },
            description: "Samaritan",
            plane: 0,
        },
        {
            interval: {
                start: 0x0840,
                end: 0x085F,
            },
            description: "Mandaic",
            plane: 0,
        },
        {
            interval: {
                start: 0x0860,
                end: 0x086F,
            },
            description: "Syriac Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x0870,
                end: 0x089F,
            },
            description: "Arabic Extended-B",
            plane: 0,
        },
        {
            interval: {
                start: 0x08A0,
                end: 0x08FF,
            },
            description: "Arabic Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0x0900,
                end: 0x097F,
            },
            description: "Devanagari",
            plane: 0,
        },
        {
            interval: {
                start: 0x0980,
                end: 0x09FF,
            },
            description: "Bengali",
            plane: 0,
        },
        {
            interval: {
                start: 0x0A00,
                end: 0x0A7F,
            },
            description: "Gurmukhi",
            plane: 0,
        },
        {
            interval: {
                start: 0x0A80,
                end: 0x0AFF,
            },
            description: "Gujarati",
            plane: 0,
        },
        {
            interval: {
                start: 0x0B00,
                end: 0x0B7F,
            },
            description: "Oriya",
            plane: 0,
        },
        {
            interval: {
                start: 0x0B80,
                end: 0x0BFF,
            },
            description: "Tamil",
            plane: 0,
        },
        {
            interval: {
                start: 0x0C00,
                end: 0x0C7F,
            },
            description: "Telugu",
            plane: 0,
        },
        {
            interval: {
                start: 0x0C80,
                end: 0x0CFF,
            },
            description: "Kannada",
            plane: 0,
        },
        {
            interval: {
                start: 0x0D00,
                end: 0x0D7F,
            },
            description: "Malayalam",
            plane: 0,
        },
        {
            interval: {
                start: 0x0D80,
                end: 0x0DFF,
            },
            description: "Sinhala",
            plane: 0,
        },
        {
            interval: {
                start: 0x0E00,
                end: 0x0E7F,
            },
            description: "Thai",
            plane: 0,
        },
        {
            interval: {
                start: 0x0E80,
                end: 0x0EFF,
            },
            description: "Lao",
            plane: 0,
        },
        {
            interval: {
                start: 0x0F00,
                end: 0x0FFF,
            },
            description: "Tibetan",
            plane: 0,
        },
        {
            interval: {
                start: 0x1000,
                end: 0x109F,
            },
            description: "Myanmar",
            plane: 0,
        },
        {
            interval: {
                start: 0x10A0,
                end: 0x10FF,
            },
            description: "Georgian",
            plane: 0,
        },
        {
            interval: {
                start: 0x1100,
                end: 0x11FF,
            },
            description: "Hangul Jamo",
            plane: 0,
        },
        {
            interval: {
                start: 0x1200,
                end: 0x137F,
            },
            description: "Ethiopic",
            plane: 0,
        },
        {
            interval: {
                start: 0x1380,
                end: 0x139F,
            },
            description: "Ethiopic Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x13A0,
                end: 0x13FF,
            },
            description: "Cherokee",
            plane: 0,
        },
        {
            interval: {
                start: 0x1400,
                end: 0x167F,
            },
            description: "Unified Canadian Aboriginal Syllabics",
            plane: 0,
        },
        {
            interval: {
                start: 0x1680,
                end: 0x169F,
            },
            description: "Ogham",
            plane: 0,
        },
        {
            interval: {
                start: 0x16A0,
                end: 0x16FF,
            },
            description: "Runic",
            plane: 0,
        },
        {
            interval: {
                start: 0x1700,
                end: 0x171F,
            },
            description: "Tagalog",
            plane: 0,
        },
        {
            interval: {
                start: 0x1720,
                end: 0x173F,
            },
            description: "Hanunoo",
            plane: 0,
        },
        {
            interval: {
                start: 0x1740,
                end: 0x175F,
            },
            description: "Buhid",
            plane: 0,
        },
        {
            interval: {
                start: 0x1760,
                end: 0x177F,
            },
            description: "Tagbanwa",
            plane: 0,
        },
        {
            interval: {
                start: 0x1780,
                end: 0x17FF,
            },
            description: "Khmer",
            plane: 0,
        },
        {
            interval: {
                start: 0x1800,
                end: 0x18AF,
            },
            description: "Mongolian",
            plane: 0,
        },
        {
            interval: {
                start: 0x18B0,
                end: 0x18FF,
            },
            description: "Unified Canadian Aboriginal Syllabics Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x1900,
                end: 0x194F,
            },
            description: "Limbu",
            plane: 0,
        },
        {
            interval: {
                start: 0x1950,
                end: 0x197F,
            },
            description: "Tai Le",
            plane: 0,
        },
        {
            interval: {
                start: 0x1980,
                end: 0x19DF,
            },
            description: "New Tai Lue",
            plane: 0,
        },
        {
            interval: {
                start: 0x19E0,
                end: 0x19FF,
            },
            description: "Khmer Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x1A00,
                end: 0x1A1F,
            },
            description: "Buginese",
            plane: 0,
        },
        {
            interval: {
                start: 0x1A20,
                end: 0x1AAF,
            },
            description: "Tai Tham",
            plane: 0,
        },
        {
            interval: {
                start: 0x1AB0,
                end: 0x1AFF,
            },
            description: "Combining Diacritical Marks Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x1B00,
                end: 0x1B7F,
            },
            description: "Balinese",
            plane: 0,
        },
        {
            interval: {
                start: 0x1B80,
                end: 0x1BBF,
            },
            description: "Sundanese",
            plane: 0,
        },
        {
            interval: {
                start: 0x1BC0,
                end: 0x1BFF,
            },
            description: "Batak",
            plane: 0,
        },
        {
            interval: {
                start: 0x1C00,
                end: 0x1C4F,
            },
            description: "Lepcha",
            plane: 0,
        },
        {
            interval: {
                start: 0x1C50,
                end: 0x1C7F,
            },
            description: "Ol Chiki",
            plane: 0,
        },
        {
            interval: {
                start: 0x1C80,
                end: 0x1C8F,
            },
            description: "Cyrillic Extended-C",
            plane: 0,
        },
        {
            interval: {
                start: 0x1C90,
                end: 0x1CBF,
            },
            description: "Georgian Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x1CC0,
                end: 0x1CCF,
            },
            description: "Sundanese Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x1CD0,
                end: 0x1CFF,
            },
            description: "Vedic Extensions",
            plane: 0,
        },
        {
            interval: {
                start: 0x1D00,
                end: 0x1D7F,
            },
            description: "Phonetic Extensions",
            plane: 0,
        },
        {
            interval: {
                start: 0x1D80,
                end: 0x1DBF,
            },
            description: "Phonetic Extensions Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x1DC0,
                end: 0x1DFF,
            },
            description: "Combining Diacritical Marks Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x1E00,
                end: 0x1EFF,
            },
            description: "Latin Extended Additional",
            plane: 0,
        },
        {
            interval: {
                start: 0x1F00,
                end: 0x1FFF,
            },
            description: "Greek Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x2000,
                end: 0x206F,
            },
            description: "General Punctuation",
            plane: 0,
        },
        {
            interval: {
                start: 0x2070,
                end: 0x209F,
            },
            description: "Superscripts and Subscripts",
            plane: 0,
        },
        {
            interval: {
                start: 0x20A0,
                end: 0x20CF,
            },
            description: "Currency Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x20D0,
                end: 0x20FF,
            },
            description: "Combining Diacritical Marks for Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x2100,
                end: 0x214F,
            },
            description: "Letterlike Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x2150,
                end: 0x218F,
            },
            description: "Number Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0x2190,
                end: 0x21FF,
            },
            description: "Arrows",
            plane: 0,
        },
        {
            interval: {
                start: 0x2200,
                end: 0x22FF,
            },
            description: "Mathematical Operators",
            plane: 0,
        },
        {
            interval: {
                start: 0x2300,
                end: 0x23FF,
            },
            description: "Miscellaneous Technical",
            plane: 0,
        },
        {
            interval: {
                start: 0x2400,
                end: 0x243F,
            },
            description: "Control Pictures",
            plane: 0,
        },
        {
            interval: {
                start: 0x2440,
                end: 0x245F,
            },
            description: "Optical Character Recognition",
            plane: 0,
        },
        {
            interval: {
                start: 0x2460,
                end: 0x24FF,
            },
            description: "Enclosed Alphanumerics",
            plane: 0,
        },
        {
            interval: {
                start: 0x2500,
                end: 0x257F,
            },
            description: "Box Drawing",
            plane: 0,
        },
        {
            interval: {
                start: 0x2580,
                end: 0x259F,
            },
            description: "Block Elements",
            plane: 0,
        },
        {
            interval: {
                start: 0x25A0,
                end: 0x25FF,
            },
            description: "Geometric Shapes",
            plane: 0,
        },
        {
            interval: {
                start: 0x2600,
                end: 0x26FF,
            },
            description: "Miscellaneous Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x2700,
                end: 0x27BF,
            },
            description: "Dingbats",
            plane: 0,
        },
        {
            interval: {
                start: 0x27C0,
                end: 0x27EF,
            },
            description: "Miscellaneous Mathematical Symbols-A",
            plane: 0,
        },
        {
            interval: {
                start: 0x27F0,
                end: 0x27FF,
            },
            description: "Supplemental Arrows-A",
            plane: 0,
        },
        {
            interval: {
                start: 0x2800,
                end: 0x28FF,
            },
            description: "Braille Patterns",
            plane: 0,
        },
        {
            interval: {
                start: 0x2900,
                end: 0x297F,
            },
            description: "Supplemental Arrows-B",
            plane: 0,
        },
        {
            interval: {
                start: 0x2980,
                end: 0x29FF,
            },
            description: "Miscellaneous Mathematical Symbols-B",
            plane: 0,
        },
        {
            interval: {
                start: 0x2A00,
                end: 0x2AFF,
            },
            description: "Supplemental Mathematical Operators",
            plane: 0,
        },
        {
            interval: {
                start: 0x2B00,
                end: 0x2BFF,
            },
            description: "Miscellaneous Symbols and Arrows",
            plane: 0,
        },
        {
            interval: {
                start: 0x2C00,
                end: 0x2C5F,
            },
            description: "Glagolitic",
            plane: 0,
        },
        {
            interval: {
                start: 0x2C60,
                end: 0x2C7F,
            },
            description: "Latin Extended-C",
            plane: 0,
        },
        {
            interval: {
                start: 0x2C80,
                end: 0x2CFF,
            },
            description: "Coptic",
            plane: 0,
        },
        {
            interval: {
                start: 0x2D00,
                end: 0x2D2F,
            },
            description: "Georgian Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x2D30,
                end: 0x2D7F,
            },
            description: "Tifinagh",
            plane: 0,
        },
        {
            interval: {
                start: 0x2D80,
                end: 0x2DDF,
            },
            description: "Ethiopic Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x2DE0,
                end: 0x2DFF,
            },
            description: "Cyrillic Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0x2E00,
                end: 0x2E7F,
            },
            description: "Supplemental Punctuation",
            plane: 0,
        },
        {
            interval: {
                start: 0x2E80,
                end: 0x2EFF,
            },
            description: "CJK Radicals Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0x2F00,
                end: 0x2FDF,
            },
            description: "Kangxi Radicals",
            plane: 0,
        },
        {
            interval: {
                start: 0x2FF0,
                end: 0x2FFF,
            },
            description: "Ideographic Description Characters",
            plane: 0,
        },
        {
            interval: {
                start: 0x3000,
                end: 0x303F,
            },
            description: "CJK Symbols and Punctuation",
            plane: 0,
        },
        {
            interval: {
                start: 0x3040,
                end: 0x309F,
            },
            description: "Hiragana",
            plane: 0,
        },
        {
            interval: {
                start: 0x30A0,
                end: 0x30FF,
            },
            description: "Katakana",
            plane: 0,
        },
        {
            interval: {
                start: 0x3100,
                end: 0x312F,
            },
            description: "Bopomofo",
            plane: 0,
        },
        {
            interval: {
                start: 0x3130,
                end: 0x318F,
            },
            description: "Hangul Compatibility Jamo",
            plane: 0,
        },
        {
            interval: {
                start: 0x3190,
                end: 0x319F,
            },
            description: "Kanbun",
            plane: 0,
        },
        {
            interval: {
                start: 0x31A0,
                end: 0x31BF,
            },
            description: "Bopomofo Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0x31C0,
                end: 0x31EF,
            },
            description: "CJK Strokes",
            plane: 0,
        },
        {
            interval: {
                start: 0x31F0,
                end: 0x31FF,
            },
            description: "Katakana Phonetic Extensions",
            plane: 0,
        },
        {
            interval: {
                start: 0x3200,
                end: 0x32FF,
            },
            description: "Enclosed CJK Letters and Months",
            plane: 0,
        },
        {
            interval: {
                start: 0x3300,
                end: 0x33FF,
            },
            description: "CJK Compatibility",
            plane: 0,
        },
        {
            interval: {
                start: 0x3400,
                end: 0x4DBF,
            },
            description: "CJK Unified Ideographs Extension A",
            plane: 0,
        },
        {
            interval: {
                start: 0x4DC0,
                end: 0x4DFF,
            },
            description: "Yijing Hexagram Symbols",
            plane: 0,
        },
        {
            interval: {
                start: 0x4E00,
                end: 0x9FFF,
            },
            description: "CJK Unified Ideographs",
            plane: 0,
        },
        {
            interval: {
                start: 0xA000,
                end: 0xA48F,
            },
            description: "Yi Syllables",
            plane: 0,
        },
        {
            interval: {
                start: 0xA490,
                end: 0xA4CF,
            },
            description: "Yi Radicals",
            plane: 0,
        },
        {
            interval: {
                start: 0xA4D0,
                end: 0xA4FF,
            },
            description: "Lisu",
            plane: 0,
        },
        {
            interval: {
                start: 0xA500,
                end: 0xA63F,
            },
            description: "Vai",
            plane: 0,
        },
        {
            interval: {
                start: 0xA640,
                end: 0xA69F,
            },
            description: "Cyrillic Extended-B",
            plane: 0,
        },
        {
            interval: {
                start: 0xA6A0,
                end: 0xA6FF,
            },
            description: "Bamum",
            plane: 0,
        },
        {
            interval: {
                start: 0xA700,
                end: 0xA71F,
            },
            description: "Modifier Tone Letters",
            plane: 0,
        },
        {
            interval: {
                start: 0xA720,
                end: 0xA7FF,
            },
            description: "Latin Extended-D",
            plane: 0,
        },
        {
            interval: {
                start: 0xA800,
                end: 0xA82F,
            },
            description: "Syloti Nagri",
            plane: 0,
        },
        {
            interval: {
                start: 0xA830,
                end: 0xA83F,
            },
            description: "Common Indic Number Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0xA840,
                end: 0xA87F,
            },
            description: "Phags-pa",
            plane: 0,
        },
        {
            interval: {
                start: 0xA880,
                end: 0xA8DF,
            },
            description: "Saurashtra",
            plane: 0,
        },
        {
            interval: {
                start: 0xA8E0,
                end: 0xA8FF,
            },
            description: "Devanagari Extended",
            plane: 0,
        },
        {
            interval: {
                start: 0xA900,
                end: 0xA92F,
            },
            description: "Kayah Li",
            plane: 0,
        },
        {
            interval: {
                start: 0xA930,
                end: 0xA95F,
            },
            description: "Rejang",
            plane: 0,
        },
        {
            interval: {
                start: 0xA960,
                end: 0xA97F,
            },
            description: "Hangul Jamo Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0xA980,
                end: 0xA9DF,
            },
            description: "Javanese",
            plane: 0,
        },
        {
            interval: {
                start: 0xA9E0,
                end: 0xA9FF,
            },
            description: "Myanmar Extended-B",
            plane: 0,
        },
        {
            interval: {
                start: 0xAA00,
                end: 0xAA5F,
            },
            description: "Cham",
            plane: 0,
        },
        {
            interval: {
                start: 0xAA60,
                end: 0xAA7F,
            },
            description: "Myanmar Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0xAA80,
                end: 0xAADF,
            },
            description: "Tai Viet",
            plane: 0,
        },
        {
            interval: {
                start: 0xAAE0,
                end: 0xAAFF,
            },
            description: "Meetei Mayek Extensions",
            plane: 0,
        },
        {
            interval: {
                start: 0xAB00,
                end: 0xAB2F,
            },
            description: "Ethiopic Extended-A",
            plane: 0,
        },
        {
            interval: {
                start: 0xAB30,
                end: 0xAB6F,
            },
            description: "Latin Extended-E",
            plane: 0,
        },
        {
            interval: {
                start: 0xAB70,
                end: 0xABBF,
            },
            description: "Cherokee Supplement",
            plane: 0,
        },
        {
            interval: {
                start: 0xABC0,
                end: 0xABFF,
            },
            description: "Meetei Mayek",
            plane: 0,
        },
        {
            interval: {
                start: 0xAC00,
                end: 0xD7AF,
            },
            description: "Hangul Syllables",
            plane: 0,
        },
        {
            interval: {
                start: 0xD7B0,
                end: 0xD7FF,
            },
            description: "Hangul Jamo Extended-B",
            plane: 0,
        },
        {
            interval: {
                start: 0xD800,
                end: 0xDB7F,
            },
            description: "High Surrogates",
            plane: 0,
        },
        {
            interval: {
                start: 0xDB80,
                end: 0xDBFF,
            },
            description: "High Private Use Surrogates",
            plane: 0,
        },
        {
            interval: {
                start: 0xDC00,
                end: 0xDFFF,
            },
            description: "Low Surrogates",
            plane: 0,
        },
        {
            interval: {
                start: 0xE000,
                end: 0xF8FF,
            },
            description: "Private Use Area",
            plane: 0,
        },
        {
            interval: {
                start: 0xF900,
                end: 0xFAFF,
            },
            description: "CJK Compatibility Ideographs",
            plane: 0,
        },
        {
            interval: {
                start: 0xFB00,
                end: 0xFB4F,
            },
            description: "Alphabetic Presentation Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0xFB50,
                end: 0xFDFF,
            },
            description: "Arabic Presentation Forms-A",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE00,
                end: 0xFE0F,
            },
            description: "Variation Selectors",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE10,
                end: 0xFE1F,
            },
            description: "Vertical Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE20,
                end: 0xFE2F,
            },
            description: "Combining Half Marks",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE30,
                end: 0xFE4F,
            },
            description: "CJK Compatibility Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE50,
                end: 0xFE6F,
            },
            description: "Small Form Variants",
            plane: 0,
        },
        {
            interval: {
                start: 0xFE70,
                end: 0xFEFF,
            },
            description: "Arabic Presentation Forms-B",
            plane: 0,
        },
        {
            interval: {
                start: 0xFF00,
                end: 0xFFEF,
            },
            description: "Halfwidth and Fullwidth Forms",
            plane: 0,
        },
        {
            interval: {
                start: 0xFFF0,
                end: 0xFFFF,
            },
            description: "Specials",
            plane: 0,
        }]
};

export const UNICODE_PLANE_1: UnicodePlane = {
    planeNumber: 1,
    description: "Supplementary Multilingual Plane",
    abbreviation: "SMP",
    interval: {
        start: 0x10000,
        end: 0x1FFFF,
    },
    blocks: [
        {
            interval: {
                start: 0x10000,
                end: 0x1007F,
            },
            description: "Linear B Syllabary",
            plane: 1,
        },
        {
            interval: {
                start: 0x10080,
                end: 0x100FF,
            },
            description: "Linear B Ideograms",
            plane: 1,
        },
        {
            interval: {
                start: 0x10100,
                end: 0x1013F,
            },
            description: "Aegean Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x10140,
                end: 0x1018F,
            },
            description: "Ancient Greek Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x10190,
                end: 0x101CF,
            },
            description: "Ancient Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x101D0,
                end: 0x101FF,
            },
            description: "Phaistos Disc",
            plane: 1,
        },
        {
            interval: {
                start: 0x10280,
                end: 0x1029F,
            },
            description: "Lycian",
            plane: 1,
        },
        {
            interval: {
                start: 0x102A0,
                end: 0x102DF,
            },
            description: "Carian",
            plane: 1,
        },
        {
            interval: {
                start: 0x102E0,
                end: 0x102FF,
            },
            description: "Coptic Epact Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x10300,
                end: 0x1032F,
            },
            description: "Old Italic",
            plane: 1,
        },
        {
            interval: {
                start: 0x10330,
                end: 0x1034F,
            },
            description: "Gothic",
            plane: 1,
        },
        {
            interval: {
                start: 0x10350,
                end: 0x1037F,
            },
            description: "Old Permic",
            plane: 1,
        },
        {
            interval: {
                start: 0x10380,
                end: 0x1039F,
            },
            description: "Ugaritic",
            plane: 1,
        },
        {
            interval: {
                start: 0x103A0,
                end: 0x103DF,
            },
            description: "Old Persian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10400,
                end: 0x1044F,
            },
            description: "Deseret",
            plane: 1,
        },
        {
            interval: {
                start: 0x10450,
                end: 0x1047F,
            },
            description: "Shavian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10480,
                end: 0x104AF,
            },
            description: "Osmanya",
            plane: 1,
        },
        {
            interval: {
                start: 0x104B0,
                end: 0x104FF,
            },
            description: "Osage",
            plane: 1,
        },
        {
            interval: {
                start: 0x10500,
                end: 0x1052F,
            },
            description: "Elbasan",
            plane: 1,
        },
        {
            interval: {
                start: 0x10530,
                end: 0x1056F,
            },
            description: "Caucasian Albanian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10570,
                end: 0x105BF,
            },
            description: "Vithkuqi",
            plane: 1,
        },
        {
            interval: {
                start: 0x10600,
                end: 0x1077F,
            },
            description: "Linear A",
            plane: 1,
        },
        {
            interval: {
                start: 0x10780,
                end: 0x107BF,
            },
            description: "Latin Extended-F",
            plane: 1,
        },
        {
            interval: {
                start: 0x10800,
                end: 0x1083F,
            },
            description: "Cypriot Syllabary",
            plane: 1,
        },
        {
            interval: {
                start: 0x10840,
                end: 0x1085F,
            },
            description: "Imperial Aramaic",
            plane: 1,
        },
        {
            interval: {
                start: 0x10860,
                end: 0x1087F,
            },
            description: "Palmyrene",
            plane: 1,
        },
        {
            interval: {
                start: 0x10880,
                end: 0x108AF,
            },
            description: "Nabataean",
            plane: 1,
        },
        {
            interval: {
                start: 0x108E0,
                end: 0x108FF,
            },
            description: "Hatran",
            plane: 1,
        },
        {
            interval: {
                start: 0x10900,
                end: 0x1091F,
            },
            description: "Phoenician",
            plane: 1,
        },
        {
            interval: {
                start: 0x10920,
                end: 0x1093F,
            },
            description: "Lydian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10980,
                end: 0x1099F,
            },
            description: "Meroitic Hieroglyphs",
            plane: 1,
        },
        {
            interval: {
                start: 0x109A0,
                end: 0x109FF,
            },
            description: "Meroitic Cursive",
            plane: 1,
        },
        {
            interval: {
                start: 0x10A00,
                end: 0x10A5F,
            },
            description: "Kharoshthi",
            plane: 1,
        },
        {
            interval: {
                start: 0x10A60,
                end: 0x10A7F,
            },
            description: "Old South Arabian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10A80,
                end: 0x10A9F,
            },
            description: "Old North Arabian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10AC0,
                end: 0x10AFF,
            },
            description: "Manichaean",
            plane: 1,
        },
        {
            interval: {
                start: 0x10B00,
                end: 0x10B3F,
            },
            description: "Avestan",
            plane: 1,
        },
        {
            interval: {
                start: 0x10B40,
                end: 0x10B5F,
            },
            description: "Inscriptional Parthian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10B60,
                end: 0x10B7F,
            },
            description: "Inscriptional Pahlavi",
            plane: 1,
        },
        {
            interval: {
                start: 0x10B80,
                end: 0x10BAF,
            },
            description: "Psalter Pahlavi",
            plane: 1,
        },
        {
            interval: {
                start: 0x10C00,
                end: 0x10C4F,
            },
            description: "Old Turkic",
            plane: 1,
        },
        {
            interval: {
                start: 0x10C80,
                end: 0x10CFF,
            },
            description: "Old Hungarian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10D00,
                end: 0x10D3F,
            },
            description: "Hanifi Rohingya",
            plane: 1,
        },
        {
            interval: {
                start: 0x10E60,
                end: 0x10E7F,
            },
            description: "Rumi Numeral Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x10E80,
                end: 0x10EBF,
            },
            description: "Yezidi",
            plane: 1,
        },
        {
            interval: {
                start: 0x10EC0,
                end: 0x10EFF,
            },
            description: "Arabic Extended-C",
            plane: 1,
        },
        {
            interval: {
                start: 0x10F00,
                end: 0x10F2F,
            },
            description: "Old Sogdian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10F30,
                end: 0x10F6F,
            },
            description: "Sogdian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10F70,
                end: 0x10FAF,
            },
            description: "Old Uyghur",
            plane: 1,
        },
        {
            interval: {
                start: 0x10FB0,
                end: 0x10FDF,
            },
            description: "Chorasmian",
            plane: 1,
        },
        {
            interval: {
                start: 0x10FE0,
                end: 0x10FFF,
            },
            description: "Elymaic",
            plane: 1,
        },
        {
            interval: {
                start: 0x11000,
                end: 0x1107F,
            },
            description: "Brahmi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11080,
                end: 0x110CF,
            },
            description: "Kaithi",
            plane: 1,
        },
        {
            interval: {
                start: 0x110D0,
                end: 0x110FF,
            },
            description: "Sora Sompeng",
            plane: 1,
        },
        {
            interval: {
                start: 0x11100,
                end: 0x1114F,
            },
            description: "Chakma",
            plane: 1,
        },
        {
            interval: {
                start: 0x11150,
                end: 0x1117F,
            },
            description: "Mahajani",
            plane: 1,
        },
        {
            interval: {
                start: 0x11180,
                end: 0x111DF,
            },
            description: "Sharada",
            plane: 1,
        },
        {
            interval: {
                start: 0x111E0,
                end: 0x111FF,
            },
            description: "Sinhala Archaic Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x11200,
                end: 0x1124F,
            },
            description: "Khojki",
            plane: 1,
        },
        {
            interval: {
                start: 0x11280,
                end: 0x112AF,
            },
            description: "Multani",
            plane: 1,
        },
        {
            interval: {
                start: 0x112B0,
                end: 0x112FF,
            },
            description: "Khudawadi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11300,
                end: 0x1137F,
            },
            description: "Grantha",
            plane: 1,
        },
        {
            interval: {
                start: 0x11400,
                end: 0x1147F,
            },
            description: "Newa",
            plane: 1,
        },
        {
            interval: {
                start: 0x11480,
                end: 0x114DF,
            },
            description: "Tirhuta",
            plane: 1,
        },
        {
            interval: {
                start: 0x11580,
                end: 0x115FF,
            },
            description: "Siddham",
            plane: 1,
        },
        {
            interval: {
                start: 0x11600,
                end: 0x1165F,
            },
            description: "Modi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11660,
                end: 0x1167F,
            },
            description: "Mongolian Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x11680,
                end: 0x116CF,
            },
            description: "Takri",
            plane: 1,
        },
        {
            interval: {
                start: 0x11700,
                end: 0x1174F,
            },
            description: "Ahom",
            plane: 1,
        },
        {
            interval: {
                start: 0x11800,
                end: 0x1184F,
            },
            description: "Dogra",
            plane: 1,
        },
        {
            interval: {
                start: 0x118A0,
                end: 0x118FF,
            },
            description: "Warang Citi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11900,
                end: 0x1195F,
            },
            description: "Dives Akuru",
            plane: 1,
        },
        {
            interval: {
                start: 0x119A0,
                end: 0x119FF,
            },
            description: "Nandinagari",
            plane: 1,
        },
        {
            interval: {
                start: 0x11A00,
                end: 0x11A4F,
            },
            description: "Zanabazar Square",
            plane: 1,
        },
        {
            interval: {
                start: 0x11A50,
                end: 0x11AAF,
            },
            description: "Soyombo",
            plane: 1,
        },
        {
            interval: {
                start: 0x11AB0,
                end: 0x11ABF,
            },
            description: "Unified Canadian Aboriginal Syllabics Extended-A",
            plane: 1,
        },
        {
            interval: {
                start: 0x11AC0,
                end: 0x11AFF,
            },
            description: "Pau Cin Hau",
            plane: 1,
        },
        {
            interval: {
                start: 0x11B00,
                end: 0x11B5F,
            },
            description: "Devanagari Extended-A",
            plane: 1,
        },
        {
            interval: {
                start: 0x11C00,
                end: 0x11C6F,
            },
            description: "Bhaiksuki",
            plane: 1,
        },
        {
            interval: {
                start: 0x11C70,
                end: 0x11CBF,
            },
            description: "Marchen",
            plane: 1,
        },
        {
            interval: {
                start: 0x11D00,
                end: 0x11D5F,
            },
            description: "Masaram Gondi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11D60,
                end: 0x11DAF,
            },
            description: "Gunjala Gondi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11EE0,
                end: 0x11EFF,
            },
            description: "Makasar",
            plane: 1,
        },
        {
            interval: {
                start: 0x11F00,
                end: 0x11F5F,
            },
            description: "Kawi",
            plane: 1,
        },
        {
            interval: {
                start: 0x11FB0,
                end: 0x11FBF,
            },
            description: "Lisu Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x11FC0,
                end: 0x11FFF,
            },
            description: "Tamil Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x12000,
                end: 0x123FF,
            },
            description: "Cuneiform",
            plane: 1,
        },
        {
            interval: {
                start: 0x12400,
                end: 0x1247F,
            },
            description: "Cuneiform Numbers and Punctuation",
            plane: 1,
        },
        {
            interval: {
                start: 0x12480,
                end: 0x1254F,
            },
            description: "Early Dynastic Cuneiform",
            plane: 1,
        },
        {
            interval: {
                start: 0x12F90,
                end: 0x12FFF,
            },
            description: "Cypro-Minoan",
            plane: 1,
        },
        {
            interval: {
                start: 0x13000,
                end: 0x1342F,
            },
            description: "Egyptian Hieroglyphs",
            plane: 1,
        },
        {
            interval: {
                start: 0x13430,
                end: 0x1345F,
            },
            description: "Egyptian Hieroglyph Format Controls",
            plane: 1,
        },
        {
            interval: {
                start: 0x14400,
                end: 0x1467F,
            },
            description: "Anatolian Hieroglyphs",
            plane: 1,
        },
        {
            interval: {
                start: 0x16800,
                end: 0x16A3F,
            },
            description: "Bamum Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x16A40,
                end: 0x16A6F,
            },
            description: "Mro",
            plane: 1,
        },
        {
            interval: {
                start: 0x16A70,
                end: 0x16ACF,
            },
            description: "Tangsa",
            plane: 1,
        },
        {
            interval: {
                start: 0x16AD0,
                end: 0x16AFF,
            },
            description: "Bassa Vah",
            plane: 1,
        },
        {
            interval: {
                start: 0x16B00,
                end: 0x16B8F,
            },
            description: "Pahawh Hmong",
            plane: 1,
        },
        {
            interval: {
                start: 0x16E40,
                end: 0x16E9F,
            },
            description: "Medefaidrin",
            plane: 1,
        },
        {
            interval: {
                start: 0x16F00,
                end: 0x16F9F,
            },
            description: "Miao",
            plane: 1,
        },
        {
            interval: {
                start: 0x16FE0,
                end: 0x16FFF,
            },
            description: "Ideographic Symbols and Punctuation",
            plane: 1,
        },
        {
            interval: {
                start: 0x17000,
                end: 0x187FF,
            },
            description: "Tangut",
            plane: 1,
        },
        {
            interval: {
                start: 0x18800,
                end: 0x18AFF,
            },
            description: "Tangut Components",
            plane: 1,
        },
        {
            interval: {
                start: 0x18B00,
                end: 0x18CFF,
            },
            description: "Khitan Small Script",
            plane: 1,
        },
        {
            interval: {
                start: 0x18D00,
                end: 0x18D7F,
            },
            description: "Tangut Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x1AFF0,
                end: 0x1AFFF,
            },
            description: "Kana Extended-B",
            plane: 1,
        },
        {
            interval: {
                start: 0x1B000,
                end: 0x1B0FF,
            },
            description: "Kana Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x1B100,
                end: 0x1B12F,
            },
            description: "Kana Extended-A",
            plane: 1,
        },
        {
            interval: {
                start: 0x1B130,
                end: 0x1B16F,
            },
            description: "Small Kana Extension",
            plane: 1,
        },
        {
            interval: {
                start: 0x1B170,
                end: 0x1B2FF,
            },
            description: "Nushu",
            plane: 1,
        },
        {
            interval: {
                start: 0x1BC00,
                end: 0x1BC9F,
            },
            description: "Duployan",
            plane: 1,
        },
        {
            interval: {
                start: 0x1BCA0,
                end: 0x1BCAF,
            },
            description: "Shorthand Format Controls",
            plane: 1,
        },
        {
            interval: {
                start: 0x1CF00,
                end: 0x1CFCF,
            },
            description: "Znamenny Musical Notation",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D000,
                end: 0x1D0FF,
            },
            description: "Byzantine Musical Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D100,
                end: 0x1D1FF,
            },
            description: "Musical Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D200,
                end: 0x1D24F,
            },
            description: "Ancient Greek Musical Notation",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D2C0,
                end: 0x1D2DF,
            },
            description: "Kaktovik Numerals",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D2E0,
                end: 0x1D2FF,
            },
            description: "Mayan Numerals",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D300,
                end: 0x1D35F,
            },
            description: "Tai Xuan Jing Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D360,
                end: 0x1D37F,
            },
            description: "Counting Rod Numerals",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D400,
                end: 0x1D7FF,
            },
            description: "Mathematical Alphanumeric Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1D800,
                end: 0x1DAAF,
            },
            description: "Sutton SignWriting",
            plane: 1,
        },
        {
            interval: {
                start: 0x1DF00,
                end: 0x1DFFF,
            },
            description: "Latin Extended-G",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E000,
                end: 0x1E02F,
            },
            description: "Glagolitic Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E030,
                end: 0x1E08F,
            },
            description: "Cyrillic Extended-D",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E100,
                end: 0x1E14F,
            },
            description: "Nyiakeng Puachue Hmong",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E290,
                end: 0x1E2BF,
            },
            description: "Toto",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E2C0,
                end: 0x1E2FF,
            },
            description: "Wancho",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E4D0,
                end: 0x1E4FF,
            },
            description: "Nag Mundari",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E7E0,
                end: 0x1E7FF,
            },
            description: "Ethiopic Extended-B",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E800,
                end: 0x1E8DF,
            },
            description: "Mende Kikakui",
            plane: 1,
        },
        {
            interval: {
                start: 0x1E900,
                end: 0x1E95F,
            },
            description: "Adlam",
            plane: 1,
        },
        {
            interval: {
                start: 0x1EC70,
                end: 0x1ECBF,
            },
            description: "Indic Siyaq Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x1ED00,
                end: 0x1ED4F,
            },
            description: "Ottoman Siyaq Numbers",
            plane: 1,
        },
        {
            interval: {
                start: 0x1EE00,
                end: 0x1EEFF,
            },
            description: "Arabic Mathematical Alphabetic Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F000,
                end: 0x1F02F,
            },
            description: "Mahjong Tiles",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F030,
                end: 0x1F09F,
            },
            description: "Domino Tiles",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F0A0,
                end: 0x1F0FF,
            },
            description: "Playing Cards",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F100,
                end: 0x1F1FF,
            },
            description: "Enclosed Alphanumeric Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F200,
                end: 0x1F2FF,
            },
            description: "Enclosed Ideographic Supplement",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F300,
                end: 0x1F5FF,
            },
            description: "Miscellaneous Symbols and Pictographs",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F600,
                end: 0x1F64F,
            },
            description: "Emoticons",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F650,
                end: 0x1F67F,
            },
            description: "Ornamental Dingbats",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F680,
                end: 0x1F6FF,
            },
            description: "Transport and Map Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F700,
                end: 0x1F77F,
            },
            description: "Alchemical Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F780,
                end: 0x1F7FF,
            },
            description: "Geometric Shapes Extended",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F800,
                end: 0x1F8FF,
            },
            description: "Supplemental Arrows-C",
            plane: 1,
        },
        {
            interval: {
                start: 0x1F900,
                end: 0x1F9FF,
            },
            description: "Supplemental Symbols and Pictographs",
            plane: 1,
        },
        {
            interval: {
                start: 0x1FA00,
                end: 0x1FA6F,
            },
            description: "Chess Symbols",
            plane: 1,
        },
        {
            interval: {
                start: 0x1FA70,
                end: 0x1FAFF,
            },
            description: "Symbols and Pictographs Extended-A",
            plane: 1,
        },
        {
            interval: {
                start: 0x1FB00,
                end: 0x1FBFF,
            },
            description: "Symbols for Legacy Computing",
            plane: 1,
        },
    ]
};

export const UNICODE_PLANE_2: UnicodePlane = {
    planeNumber: 2,
    description: "Supplementary Ideographic Plane",
    abbreviation: "SIP",
    interval: {
        start: 0x20000,
        end: 0x2FFFF,
    },
    blocks: [
        {
            interval: {
                start: 0x20000,
                end: 0x2A6DF,
            },
            description: "CJK Unified Ideographs Extension B",
            plane: 2,
        },
        {
            interval: {
                start: 0x2A700,
                end: 0x2B73F,
            },
            description: "CJK Unified Ideographs Extension C",
            plane: 2,
        },
        {
            interval: {
                start: 0x2B740,
                end: 0x2B81F,
            },
            description: "CJK Unified Ideographs Extension D",
            plane: 2,
        },
        {
            interval: {
                start: 0x2B820,
                end: 0x2CEAF,
            },
            description: "CJK Unified Ideographs Extension E",
            plane: 2,
        },
        {
            interval: {
                start: 0x2CEB0,
                end: 0x2EBEF,
            },
            description: "CJK Unified Ideographs Extension F",
            plane: 2,
        },
        {
            interval: {
                start: 0x2EBF0,
                end: 0x2EE5F,
            },
            description: "CJK Unified Ideographs Extension I",
            plane: 2,
        },
        {
            interval: {
                start: 0x2F800,
                end: 0x2FA1F,
            },
            description: "CJK Compatibility Ideographs Supplement",
            plane: 2,
        },
    ]
};

export const UNICODE_PLANE_3: UnicodePlane = {
    planeNumber: 3,
    description: "Tertiary Ideographic Plane",
    abbreviation: "TIP",
    interval: {
        start: 0x30000,
        end: 0x3FFFF,
    },
    blocks: [
        {
            interval: {
                start: 0x30000,
                end: 0x3134F,
            },
            description: "CJK Unified Ideographs Extension G",
            plane: 3,
        },
        {
            interval: {
                start: 0x31350,
                end: 0x323AF,
            },
            description: "CJK Unified Ideographs Extension H",
            plane: 3,
        },
    ]
};

export const UNICODE_PLANE_14: UnicodePlane = {
    planeNumber: 14,
    description: "Supplementary Special-purpose Plane",
    abbreviation: "SSP",
    interval: {
        start: 0xE0000,
        end: 0xEFFFF,
    },
    blocks: [
        {
            interval: {
                start: 0xE0000,
                end: 0xE007F,
            },
            description: "Tags",
            plane: 14,
        },
        {
            interval: {
                start: 0xE0100,
                end: 0xE01EF,
            },
            description: "Variation Selectors Supplement",
            plane: 14,
        },
    ]
};

export const UNICODE_PLANE_15: UnicodePlane = {
    planeNumber: 15,
    description: "Supplementary Private Use Area-A",
    abbreviation: "SPUA-A",
    interval: {
        start: 0xF0000,
        end: 0xFFFFF,
    },
    blocks: [
        {
            interval: {
                start: 0xF0000,
                end: 0xFFFFF,
            },
            description: "Supplementary Private Use Area-A",
            plane: 15,
        },
    ]
};

export const UNICODE_PLANE_16: UnicodePlane = {
    planeNumber: 16,
    description: "Supplementary Private Use Area-B",
    abbreviation: "SPUA-B",
    interval: {
        start: 0x100000,
        end: 0x10FFFF,
    },
    blocks: [
        {
            interval: {
                start: 0x100000,
                end: 0x10FFFF,
            },
            description: "Supplementary Private Use Area-B",
            plane: 16,
        },
    ]
};

export const UNICODE_PLANES_ALL: UnicodePlane[] = [
    UNICODE_PLANE_0,
    UNICODE_PLANE_1,
    UNICODE_PLANE_2,
    UNICODE_PLANE_3,
    /* Planes 4-13 are unassigned */
    UNICODE_PLANE_14,
    UNICODE_PLANE_15,
    UNICODE_PLANE_16,
];
