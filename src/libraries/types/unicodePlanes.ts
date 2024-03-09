import {UnicodePlane} from "./unicodePlane";

export const UNICODE_PLANES_ALL: UnicodePlane[] = [
    {
        planeNumber: 0,
        description: "Basic Multilingual Plane",
        range: {
            start: 0x0000,
            end: 0xFFFF,
        },
        blocks: [
            {
                range: {
                    start: 0x0000,
                    end: 0x007F,
                },
                description: "Basic Latin",
            },
            {
                range: {
                    start: 0x0080,
                    end: 0x00FF,
                },
                description: "Latin-1 Supplement",
            },
            {
                range: {
                    start: 0x0100,
                    end: 0x017F,
                },
                description: "Latin Extended-A",
            },
            {
                range: {
                    start: 0x0180,
                    end: 0x024F,
                },
                description: "Latin Extended-B",
            },
            {
                range: {
                    start: 0x0250,
                    end: 0x02AF,
                },
                description: "IPA Extensions",
            },
            {
                range: {
                    start: 0x02B0,
                    end: 0x02FF,
                },
                description: "Spacing Modifier Letters",
            },
            {
                range: {
                    start: 0x0300,
                    end: 0x036F,
                },
                description: "Combining Diacritical Marks",
            },
            {
                range: {
                    start: 0x0370,
                    end: 0x03FF,
                },
                description: "Greek and Coptic",
            },
            {
                range: {
                    start: 0x0400,
                    end: 0x04FF,
                },
                description: "Cyrillic",
            },
            {
                range: {
                    start: 0x0500,
                    end: 0x052F,
                },
                description: "Cyrillic Supplement",
            },
            {
                range: {
                    start: 0x0530,
                    end: 0x058F,
                },
                description: "Armenian",
            },
            {
                range: {
                    start: 0x0590,
                    end: 0x05FF,
                },
                description: "Hebrew",
            },
            {
                range: {
                    start: 0x0600,
                    end: 0x06FF,
                },
                description: "Arabic",
            },
            {
                range: {
                    start: 0x0700,
                    end: 0x074F,
                },
                description: "Syriac",
            },
            {
                range: {
                    start: 0x0750,
                    end: 0x077F,
                },
                description: "Arabic Supplement",
            },
            {
                range: {
                    start: 0x0780,
                    end: 0x07BF,
                },
                description: "Thaana",
            },
            {
                range: {
                    start: 0x07C0,
                    end: 0x07FF,
                },
                description: "NKo",
            },
            {
                range: {
                    start: 0x0800,
                    end: 0x083F,
                },
                description: "Samaritan",
            },
            {
                range: {
                    start: 0x0840,
                    end: 0x085F,
                },
                description: "Mandaic",
            },
            {
                range: {
                    start: 0x0860,
                    end: 0x086F,
                },
                description: "Syriac Supplement",
            },
            {
                range: {
                    start: 0x0870,
                    end: 0x089F,
                },
                description: "Arabic Extended-B",
            },
            {
                range: {
                    start: 0x08A0,
                    end: 0x08FF,
                },
                description: "Arabic Extended-A",
            },
            {
                range: {
                    start: 0x0900,
                    end: 0x097F,
                },
                description: "Devanagari",
            },
            {
                range: {
                    start: 0x0980,
                    end: 0x09FF,
                },
                description: "Bengali",
            },
            {
                range: {
                    start: 0x0A00,
                    end: 0x0A7F,
                },
                description: "Gurmukhi",
            },
            {
                range: {
                    start: 0x0A80,
                    end: 0x0AFF,
                },
                description: "Gujarati",
            },
            {
                range: {
                    start: 0x0B00,
                    end: 0x0B7F,
                },
                description: "Oriya",
            },
            {
                range: {
                    start: 0x0B80,
                    end: 0x0BFF,
                },
                description: "Tamil",
            },
            {
                range: {
                    start: 0x0C00,
                    end: 0x0C7F,
                },
                description: "Telugu",
            },
            {
                range: {
                    start: 0x0C80,
                    end: 0x0CFF,
                },
                description: "Kannada",
            },
            {
                range: {
                    start: 0x0D00,
                    end: 0x0D7F,
                },
                description: "Malayalam",
            },
            {
                range: {
                    start: 0x0D80,
                    end: 0x0DFF,
                },
                description: "Sinhala",
            },
            {
                range: {
                    start: 0x0E00,
                    end: 0x0E7F,
                },
                description: "Thai",
            },
            {
                range: {
                    start: 0x0E80,
                    end: 0x0EFF,
                },
                description: "Lao",
            },
            {
                range: {
                    start: 0x0F00,
                    end: 0x0FFF,
                },
                description: "Tibetan",
            },
            {
                range: {
                    start: 0x1000,
                    end: 0x109F,
                },
                description: "Myanmar",
            },
            {
                range: {
                    start: 0x10A0,
                    end: 0x10FF,
                },
                description: "Georgian",
            },
            {
                range: {
                    start: 0x1100,
                    end: 0x11FF,
                },
                description: "Hangul Jamo",
            },
            {
                range: {
                    start: 0x1200,
                    end: 0x137F,
                },
                description: "Ethiopic",
            },
            {
                range: {
                    start: 0x1380,
                    end: 0x139F,
                },
                description: "Ethiopic Supplement",
            },
            {
                range: {
                    start: 0x13A0,
                    end: 0x13FF,
                },
                description: "Cherokee",
            },
            {
                range: {
                    start: 0x1400,
                    end: 0x167F,
                },
                description: "Unified Canadian Aboriginal Syllabics",
            },
            {
                range: {
                    start: 0x1680,
                    end: 0x169F,
                },
                description: "Ogham",
            },
            {
                range: {
                    start: 0x16A0,
                    end: 0x16FF,
                },
                description: "Runic",
            },
            {
                range: {
                    start: 0x1700,
                    end: 0x171F,
                },
                description: "Tagalog",
            },
            {
                range: {
                    start: 0x1720,
                    end: 0x173F,
                },
                description: "Hanunoo",
            },
            {
                range: {
                    start: 0x1740,
                    end: 0x175F,
                },
                description: "Buhid",
            },
            {
                range: {
                    start: 0x1760,
                    end: 0x177F,
                },
                description: "Tagbanwa",
            },
            {
                range: {
                    start: 0x1780,
                    end: 0x17FF,
                },
                description: "Khmer",
            },
            {
                range: {
                    start: 0x1800,
                    end: 0x18AF,
                },
                description: "Mongolian",
            },
            {
                range: {
                    start: 0x18B0,
                    end: 0x18FF,
                },
                description: "Unified Canadian Aboriginal Syllabics Extended",
            },
            {
                range: {
                    start: 0x1900,
                    end: 0x194F,
                },
                description: "Limbu",
            },
            {
                range: {
                    start: 0x1950,
                    end: 0x197F,
                },
                description: "Tai Le",
            },
            {
                range: {
                    start: 0x1980,
                    end: 0x19DF,
                },
                description: "New Tai Lue",
            },
            {
                range: {
                    start: 0x19E0,
                    end: 0x19FF,
                },
                description: "Khmer Symbols",
            },
            {
                range: {
                    start: 0x1A00,
                    end: 0x1A1F,
                },
                description: "Buginese",
            },
            {
                range: {
                    start: 0x1A20,
                    end: 0x1AAF,
                },
                description: "Tai Tham",
            },
            {
                range: {
                    start: 0x1AB0,
                    end: 0x1AFF,
                },
                description: "Combining Diacritical Marks Extended",
            },
            {
                range: {
                    start: 0x1B00,
                    end: 0x1B7F,
                },
                description: "Balinese",
            },
            {
                range: {
                    start: 0x1B80,
                    end: 0x1BBF,
                },
                description: "Sundanese",
            },
            {
                range: {
                    start: 0x1BC0,
                    end: 0x1BFF,
                },
                description: "Batak",
            },
            {
                range: {
                    start: 0x1C00,
                    end: 0x1C4F,
                },
                description: "Lepcha",
            },
            {
                range: {
                    start: 0x1C50,
                    end: 0x1C7F,
                },
                description: "Ol Chiki",
            },
            {
                range: {
                    start: 0x1C80,
                    end: 0x1C8F,
                },
                description: "Cyrillic Extended-C",
            },
            {
                range: {
                    start: 0x1C90,
                    end: 0x1CBF,
                },
                description: "Georgian Extended",
            },
            {
                range: {
                    start: 0x1CC0,
                    end: 0x1CCF,
                },
                description: "Sundanese Supplement",
            },
            {
                range: {
                    start: 0x1CD0,
                    end: 0x1CFF,
                },
                description: "Vedic Extensions",
            },
            {
                range: {
                    start: 0x1D00,
                    end: 0x1D7F,
                },
                description: "Phonetic Extensions",
            },
            {
                range: {
                    start: 0x1D80,
                    end: 0x1DBF,
                },
                description: "Phonetic Extensions Supplement",
            },
            {
                range: {
                    start: 0x1DC0,
                    end: 0x1DFF,
                },
                description: "Combining Diacritical Marks Supplement",
            },
            {
                range: {
                    start: 0x1E00,
                    end: 0x1EFF,
                },
                description: "Latin Extended Additional",
            },
            {
                range: {
                    start: 0x1F00,
                    end: 0x1FFF,
                },
                description: "Greek Extended",
            },
            {
                range: {
                    start: 0x2000,
                    end: 0x206F,
                },
                description: "General Punctuation",
            },
            {
                range: {
                    start: 0x2070,
                    end: 0x209F,
                },
                description: "Superscripts and Subscripts",
            },
            {
                range: {
                    start: 0x20A0,
                    end: 0x20CF,
                },
                description: "Currency Symbols",
            },
            {
                range: {
                    start: 0x20D0,
                    end: 0x20FF,
                },
                description: "Combining Diacritical Marks for Symbols",
            },
            {
                range: {
                    start: 0x2100,
                    end: 0x214F,
                },
                description: "Letterlike Symbols",
            },
            {
                range: {
                    start: 0x2150,
                    end: 0x218F,
                },
                description: "Number Forms",
            },
            {
                range: {
                    start: 0x2190,
                    end: 0x21FF,
                },
                description: "Arrows",
            },
            {
                range: {
                    start: 0x2200,
                    end: 0x22FF,
                },
                description: "Mathematical Operators",
            },
            {
                range: {
                    start: 0x2300,
                    end: 0x23FF,
                },
                description: "Miscellaneous Technical",
            },
            {
                range: {
                    start: 0x2400,
                    end: 0x243F,
                },
                description: "Control Pictures",
            },
            {
                range: {
                    start: 0x2440,
                    end: 0x245F,
                },
                description: "Optical Character Recognition",
            },
            {
                range: {
                    start: 0x2460,
                    end: 0x24FF,
                },
                description: "Enclosed Alphanumerics",
            },
            {
                range: {
                    start: 0x2500,
                    end: 0x257F,
                },
                description: "Box Drawing",
            },
            {
                range: {
                    start: 0x2580,
                    end: 0x259F,
                },
                description: "Block Elements",
            },
            {
                range: {
                    start: 0x25A0,
                    end: 0x25FF,
                },
                description: "Geometric Shapes",
            },
            {
                range: {
                    start: 0x2600,
                    end: 0x26FF,
                },
                description: "Miscellaneous Symbols",
            },
            {
                range: {
                    start: 0x2700,
                    end: 0x27BF,
                },
                description: "Dingbats",
            },
            {
                range: {
                    start: 0x27C0,
                    end: 0x27EF,
                },
                description: "Miscellaneous Mathematical Symbols-A",
            },
            {
                range: {
                    start: 0x27F0,
                    end: 0x27FF,
                },
                description: "Supplemental Arrows-A",
            },
            {
                range: {
                    start: 0x2800,
                    end: 0x28FF,
                },
                description: "Braille Patterns",
            },
            {
                range: {
                    start: 0x2900,
                    end: 0x297F,
                },
                description: "Supplemental Arrows-B",
            },
            {
                range: {
                    start: 0x2980,
                    end: 0x29FF,
                },
                description: "Miscellaneous Mathematical Symbols-B",
            },
            {
                range: {
                    start: 0x2A00,
                    end: 0x2AFF,
                },
                description: "Supplemental Mathematical Operators",
            },
            {
                range: {
                    start: 0x2B00,
                    end: 0x2BFF,
                },
                description: "Miscellaneous Symbols and Arrows",
            },
            {
                range: {
                    start: 0x2C00,
                    end: 0x2C5F,
                },
                description: "Glagolitic",
            },
            {
                range: {
                    start: 0x2C60,
                    end: 0x2C7F,
                },
                description: "Latin Extended-C",
            },
            {
                range: {
                    start: 0x2C80,
                    end: 0x2CFF,
                },
                description: "Coptic",
            },
            {
                range: {
                    start: 0x2D00,
                    end: 0x2D2F,
                },
                description: "Georgian Supplement",
            },
            {
                range: {
                    start: 0x2D30,
                    end: 0x2D7F,
                },
                description: "Tifinagh",
            },
            {
                range: {
                    start: 0x2D80,
                    end: 0x2DDF,
                },
                description: "Ethiopic Extended",
            },
            {
                range: {
                    start: 0x2DE0,
                    end: 0x2DFF,
                },
                description: "Cyrillic Extended-A",
            },
            {
                range: {
                    start: 0x2E00,
                    end: 0x2E7F,
                },
                description: "Supplemental Punctuation",
            },
            {
                range: {
                    start: 0x2E80,
                    end: 0x2EFF,
                },
                description: "CJK Radicals Supplement",
            },
            {
                range: {
                    start: 0x2F00,
                    end: 0x2FDF,
                },
                description: "Kangxi Radicals",
            },
            {
                range: {
                    start: 0x2FF0,
                    end: 0x2FFF,
                },
                description: "Ideographic Description Characters",
            },
            {
                range: {
                    start: 0x3000,
                    end: 0x303F,
                },
                description: "CJK Symbols and Punctuation",
            },
            {
                range: {
                    start: 0x3040,
                    end: 0x309F,
                },
                description: "Hiragana",
            },
            {
                range: {
                    start: 0x30A0,
                    end: 0x30FF,
                },
                description: "Katakana",
            },
            {
                range: {
                    start: 0x3100,
                    end: 0x312F,
                },
                description: "Bopomofo",
            },
            {
                range: {
                    start: 0x3130,
                    end: 0x318F,
                },
                description: "Hangul Compatibility Jamo",
            },
            {
                range: {
                    start: 0x3190,
                    end: 0x319F,
                },
                description: "Kanbun",
            },
            {
                range: {
                    start: 0x31A0,
                    end: 0x31BF,
                },
                description: "Bopomofo Extended",
            },
            {
                range: {
                    start: 0x31C0,
                    end: 0x31EF,
                },
                description: "CJK Strokes",
            },
            {
                range: {
                    start: 0x31F0,
                    end: 0x31FF,
                },
                description: "Katakana Phonetic Extensions",
            },
            {
                range: {
                    start: 0x3200,
                    end: 0x32FF,
                },
                description: "Enclosed CJK Letters and Months",
            },
            {
                range: {
                    start: 0x3300,
                    end: 0x33FF,
                },
                description: "CJK Compatibility",
            },
            {
                range: {
                    start: 0x3400,
                    end: 0x4DBF,
                },
                description: "CJK Unified Ideographs Extension A",
            },
            {
                range: {
                    start: 0x4DC0,
                    end: 0x4DFF,
                },
                description: "Yijing Hexagram Symbols",
            },
            {
                range: {
                    start: 0x4E00,
                    end: 0x9FFF,
                },
                description: "CJK Unified Ideographs",
            },
            {
                range: {
                    start: 0xA000,
                    end: 0xA48F,
                },
                description: "Yi Syllables",
            },
            {
                range: {
                    start: 0xA490,
                    end: 0xA4CF,
                },
                description: "Yi Radicals",
            },
            {
                range: {
                    start: 0xA4D0,
                    end: 0xA4FF,
                },
                description: "Lisu",
            },
            {
                range: {
                    start: 0xA500,
                    end: 0xA63F,
                },
                description: "Vai",
            },
            {
                range: {
                    start: 0xA640,
                    end: 0xA69F,
                },
                description: "Cyrillic Extended-B",
            },
            {
                range: {
                    start: 0xA6A0,
                    end: 0xA6FF,
                },
                description: "Bamum",
            },
            {
                range: {
                    start: 0xA700,
                    end: 0xA71F,
                },
                description: "Modifier Tone Letters",
            },
            {
                range: {
                    start: 0xA720,
                    end: 0xA7FF,
                },
                description: "Latin Extended-D",
            },
            {
                range: {
                    start: 0xA800,
                    end: 0xA82F,
                },
                description: "Syloti Nagri",
            },
            {
                range: {
                    start: 0xA830,
                    end: 0xA83F,
                },
                description: "Common Indic Number Forms",
            },
            {
                range: {
                    start: 0xA840,
                    end: 0xA87F,
                },
                description: "Phags-pa",
            },
            {
                range: {
                    start: 0xA880,
                    end: 0xA8DF,
                },
                description: "Saurashtra",
            },
            {
                range: {
                    start: 0xA8E0,
                    end: 0xA8FF,
                },
                description: "Devanagari Extended",
            },
            {
                range: {
                    start: 0xA900,
                    end: 0xA92F,
                },
                description: "Kayah Li",
            },
            {
                range: {
                    start: 0xA930,
                    end: 0xA95F,
                },
                description: "Rejang",
            },
            {
                range: {
                    start: 0xA960,
                    end: 0xA97F,
                },
                description: "Hangul Jamo Extended-A",
            },
            {
                range: {
                    start: 0xA980,
                    end: 0xA9DF,
                },
                description: "Javanese",
            },
            {
                range: {
                    start: 0xA9E0,
                    end: 0xA9FF,
                },
                description: "Myanmar Extended-B",
            },
            {
                range: {
                    start: 0xAA00,
                    end: 0xAA5F,
                },
                description: "Cham",
            },
            {
                range: {
                    start: 0xAA60,
                    end: 0xAA7F,
                },
                description: "Myanmar Extended-A",
            },
            {
                range: {
                    start: 0xAA80,
                    end: 0xAADF,
                },
                description: "Tai Viet",
            },
            {
                range: {
                    start: 0xAAE0,
                    end: 0xAAFF,
                },
                description: "Meetei Mayek Extensions",
            },
            {
                range: {
                    start: 0xAB00,
                    end: 0xAB2F,
                },
                description: "Ethiopic Extended-A",
            },
            {
                range: {
                    start: 0xAB30,
                    end: 0xAB6F,
                },
                description: "Latin Extended-E",
            },
            {
                range: {
                    start: 0xAB70,
                    end: 0xABBF,
                },
                description: "Cherokee Supplement",
            },
            {
                range: {
                    start: 0xABC0,
                    end: 0xABFF,
                },
                description: "Meetei Mayek",
            },
            {
                range: {
                    start: 0xAC00,
                    end: 0xD7AF,
                },
                description: "Hangul Syllables",
            },
            {
                range: {
                    start: 0xD7B0,
                    end: 0xD7FF,
                },
                description: "Hangul Jamo Extended-B",
            },
            {
                range: {
                    start: 0xD800,
                    end: 0xDB7F,
                },
                description: "High Surrogates",
            },
            {
                range: {
                    start: 0xDB80,
                    end: 0xDBFF,
                },
                description: "High Private Use Surrogates",
            },
            {
                range: {
                    start: 0xDC00,
                    end: 0xDFFF,
                },
                description: "Low Surrogates",
            },
            {
                range: {
                    start: 0xE000,
                    end: 0xF8FF,
                },
                description: "Private Use Area",
            },
            {
                range: {
                    start: 0xF900,
                    end: 0xFAFF,
                },
                description: "CJK Compatibility Ideographs",
            },
            {
                range: {
                    start: 0xFB00,
                    end: 0xFB4F,
                },
                description: "Alphabetic Presentation Forms",
            },
            {
                range: {
                    start: 0xFB50,
                    end: 0xFDFF,
                },
                description: "Arabic Presentation Forms-A",
            },
            {
                range: {
                    start: 0xFE00,
                    end: 0xFE0F,
                },
                description: "Variation Selectors",
            },
            {
                range: {
                    start: 0xFE10,
                    end: 0xFE1F,
                },
                description: "Vertical Forms",
            },
            {
                range: {
                    start: 0xFE20,
                    end: 0xFE2F,
                },
                description: "Combining Half Marks",
            },
            {
                range: {
                    start: 0xFE30,
                    end: 0xFE4F,
                },
                description: "CJK Compatibility Forms",
            },
            {
                range: {
                    start: 0xFE50,
                    end: 0xFE6F,
                },
                description: "Small Form Variants",
            },
            {
                range: {
                    start: 0xFE70,
                    end: 0xFEFF,
                },
                description: "Arabic Presentation Forms-B",
            },
            {
                range: {
                    start: 0xFF00,
                    end: 0xFFEF,
                },
                description: "Halfwidth and Fullwidth Forms",
            },
            {
                range: {
                    start: 0xFFF0,
                    end: 0xFFFF,
                },
                description: "Specials",
            }]
    },
    {
        planeNumber: 1,
        description: "Supplementary Multilingual Plane",
        range: {
            start: 0x10000,
            end: 0x1FFFF,
        },
        blocks: [
            {
                range: {
                    start: 0x10000,
                    end: 0x1007F,
                },
                description: "Linear B Syllabary"
            },
            {
                range: {
                    start: 0x10080,
                    end: 0x100FF,
                },
                description: "Linear B Ideograms"
            },
            {
                range: {
                    start: 0x10100,
                    end: 0x1013F,
                },
                description: "Aegean Numbers"
            },
            {
                range: {
                    start: 0x10140,
                    end: 0x1018F,
                },
                description: "Ancient Greek Numbers"
            },
            {
                range: {
                    start: 0x10190,
                    end: 0x101CF,
                },
                description: "Ancient Symbols"
            },
            {
                range: {
                    start: 0x101D0,
                    end: 0x101FF,
                },
                description: "Phaistos Disc"
            },
            {
                range: {
                    start: 0x10280,
                    end: 0x1029F,
                },
                description: "Lycian"
            },
            {
                range: {
                    start: 0x102A0,
                    end: 0x102DF,
                },
                description: "Carian"
            },
            {
                range: {
                    start: 0x102E0,
                    end: 0x102FF,
                },
                description: "Coptic Epact Numbers"
            },
            {
                range: {
                    start: 0x10300,
                    end: 0x1032F,
                },
                description: "Old Italic"
            },
            {
                range: {
                    start: 0x10330,
                    end: 0x1034F,
                },
                description: "Gothic"
            },
            {
                range: {
                    start: 0x10350,
                    end: 0x1037F,
                },
                description: "Old Permic"
            },
            {
                range: {
                    start: 0x10380,
                    end: 0x1039F,
                },
                description: "Ugaritic"
            },
            {
                range: {
                    start: 0x103A0,
                    end: 0x103DF,
                },
                description: "Old Persian"
            },
            {
                range: {
                    start: 0x10400,
                    end: 0x1044F,
                },
                description: "Deseret"
            },
            {
                range: {
                    start: 0x10450,
                    end: 0x1047F,
                },
                description: "Shavian"
            },
            {
                range: {
                    start: 0x10480,
                    end: 0x104AF,
                },
                description: "Osmanya"
            },
            {
                range: {
                    start: 0x104B0,
                    end: 0x104FF,
                },
                description: "Osage"
            },
            {
                range: {
                    start: 0x10500,
                    end: 0x1052F,
                },
                description: "Elbasan"
            },
            {
                range: {
                    start: 0x10530,
                    end: 0x1056F,
                },
                description: "Caucasian Albanian"
            },
            {
                range: {
                    start: 0x10570,
                    end: 0x105BF,
                },
                description: "Vithkuqi"
            },
            {
                range: {
                    start: 0x10600,
                    end: 0x1077F,
                },
                description: "Linear A"
            },
            {
                range: {
                    start: 0x10780,
                    end: 0x107BF,
                },
                description: "Latin Extended-F"
            },
            {
                range: {
                    start: 0x10800,
                    end: 0x1083F,
                },
                description: "Cypriot Syllabary"
            },
            {
                range: {
                    start: 0x10840,
                    end: 0x1085F,
                },
                description: "Imperial Aramaic"
            },
            {
                range: {
                    start: 0x10860,
                    end: 0x1087F,
                },
                description: "Palmyrene"
            },
            {
                range: {
                    start: 0x10880,
                    end: 0x108AF,
                },
                description: "Nabataean"
            },
            {
                range: {
                    start: 0x108E0,
                    end: 0x108FF,
                },
                description: "Hatran"
            },
            {
                range: {
                    start: 0x10900,
                    end: 0x1091F,
                },
                description: "Phoenician"
            },
            {
                range: {
                    start: 0x10920,
                    end: 0x1093F,
                },
                description: "Lydian"
            },
            {
                range: {
                    start: 0x10980,
                    end: 0x1099F,
                },
                description: "Meroitic Hieroglyphs"
            },
            {
                range: {
                    start: 0x109A0,
                    end: 0x109FF,
                },
                description: "Meroitic Cursive"
            },
            {
                range: {
                    start: 0x10A00,
                    end: 0x10A5F,
                },
                description: "Kharoshthi"
            },
            {
                range: {
                    start: 0x10A60,
                    end: 0x10A7F,
                },
                description: "Old South Arabian"
            },
            {
                range: {
                    start: 0x10A80,
                    end: 0x10A9F,
                },
                description: "Old North Arabian"
            },
            {
                range: {
                    start: 0x10AC0,
                    end: 0x10AFF,
                },
                description: "Manichaean"
            },
            {
                range: {
                    start: 0x10B00,
                    end: 0x10B3F,
                },
                description: "Avestan"
            },
            {
                range: {
                    start: 0x10B40,
                    end: 0x10B5F,
                },
                description: "Inscriptional Parthian"
            },
            {
                range: {
                    start: 0x10B60,
                    end: 0x10B7F,
                },
                description: "Inscriptional Pahlavi"
            },
            {
                range: {
                    start: 0x10B80,
                    end: 0x10BAF,
                },
                description: "Psalter Pahlavi"
            },
            {
                range: {
                    start: 0x10C00,
                    end: 0x10C4F,
                },
                description: "Old Turkic"
            },
            {
                range: {
                    start: 0x10C80,
                    end: 0x10CFF,
                },
                description: "Old Hungarian"
            },
            {
                range: {
                    start: 0x10D00,
                    end: 0x10D3F,
                },
                description: "Hanifi Rohingya"
            },
            {
                range: {
                    start: 0x10E60,
                    end: 0x10E7F,
                },
                description: "Rumi Numeral Symbols"
            },
            {
                range: {
                    start: 0x10E80,
                    end: 0x10EBF,
                },
                description: "Yezidi"
            },
            {
                range: {
                    start: 0x10EC0,
                    end: 0x10EFF,
                },
                description: "Arabic Extended-C"
            },
            {
                range: {
                    start: 0x10F00,
                    end: 0x10F2F,
                },
                description: "Old Sogdian"
            },
            {
                range: {
                    start: 0x10F30,
                    end: 0x10F6F,
                },
                description: "Sogdian"
            },
            {
                range: {
                    start: 0x10F70,
                    end: 0x10FAF,
                },
                description: "Old Uyghur"
            },
            {
                range: {
                    start: 0x10FB0,
                    end: 0x10FDF,
                },
                description: "Chorasmian"
            },
            {
                range: {
                    start: 0x10FE0,
                    end: 0x10FFF,
                },
                description: "Elymaic"
            },
            {
                range: {
                    start: 0x11000,
                    end: 0x1107F,
                },
                description: "Brahmi"
            },
            {
                range: {
                    start: 0x11080,
                    end: 0x110CF,
                },
                description: "Kaithi"
            },
            {
                range: {
                    start: 0x110D0,
                    end: 0x110FF,
                },
                description: "Sora Sompeng"
            },
            {
                range: {
                    start: 0x11100,
                    end: 0x1114F,
                },
                description: "Chakma"
            },
            {
                range: {
                    start: 0x11150,
                    end: 0x1117F,
                },
                description: "Mahajani"
            },
            {
                range: {
                    start: 0x11180,
                    end: 0x111DF,
                },
                description: "Sharada"
            },
            {
                range: {
                    start: 0x111E0,
                    end: 0x111FF,
                },
                description: "Sinhala Archaic Numbers"
            },
            {
                range: {
                    start: 0x11200,
                    end: 0x1124F,
                },
                description: "Khojki"
            },
            {
                range: {
                    start: 0x11280,
                    end: 0x112AF,
                },
                description: "Multani"
            },
            {
                range: {
                    start: 0x112B0,
                    end: 0x112FF,
                },
                description: "Khudawadi"
            },
            {
                range: {
                    start: 0x11300,
                    end: 0x1137F,
                },
                description: "Grantha"
            },
            {
                range: {
                    start: 0x11400,
                    end: 0x1147F,
                },
                description: "Newa"
            },
            {
                range: {
                    start: 0x11480,
                    end: 0x114DF,
                },
                description: "Tirhuta"
            },
            {
                range: {
                    start: 0x11580,
                    end: 0x115FF,
                },
                description: "Siddham"
            },
            {
                range: {
                    start: 0x11600,
                    end: 0x1165F,
                },
                description: "Modi"
            },
            {
                range: {
                    start: 0x11660,
                    end: 0x1167F,
                },
                description: "Mongolian Supplement"
            },
            {
                range: {
                    start: 0x11680,
                    end: 0x116CF,
                },
                description: "Takri"
            },
            {
                range: {
                    start: 0x11700,
                    end: 0x1174F,
                },
                description: "Ahom"
            },
            {
                range: {
                    start: 0x11800,
                    end: 0x1184F,
                },
                description: "Dogra"
            },
            {
                range: {
                    start: 0x118A0,
                    end: 0x118FF,
                },
                description: "Warang Citi"
            },
            {
                range: {
                    start: 0x11900,
                    end: 0x1195F,
                },
                description: "Dives Akuru"
            },
            {
                range: {
                    start: 0x119A0,
                    end: 0x119FF,
                },
                description: "Nandinagari"
            },
            {
                range: {
                    start: 0x11A00,
                    end: 0x11A4F,
                },
                description: "Zanabazar Square"
            },
            {
                range: {
                    start: 0x11A50,
                    end: 0x11AAF,
                },
                description: "Soyombo"
            },
            {
                range: {
                    start: 0x11AB0,
                    end: 0x11ABF,
                },
                description: "Unified Canadian Aboriginal Syllabics Extended-A"
            },
            {
                range: {
                    start: 0x11AC0,
                    end: 0x11AFF,
                },
                description: "Pau Cin Hau"
            },
            {
                range: {
                    start: 0x11B00,
                    end: 0x11B5F,
                },
                description: "Devanagari Extended-A"
            },
            {
                range: {
                    start: 0x11C00,
                    end: 0x11C6F,
                },
                description: "Bhaiksuki"
            },
            {
                range: {
                    start: 0x11C70,
                    end: 0x11CBF,
                },
                description: "Marchen"
            },
            {
                range: {
                    start: 0x11D00,
                    end: 0x11D5F,
                },
                description: "Masaram Gondi"
            },
            {
                range: {
                    start: 0x11D60,
                    end: 0x11DAF,
                },
                description: "Gunjala Gondi"
            },
            {
                range: {
                    start: 0x11EE0,
                    end: 0x11EFF,
                },
                description: "Makasar"
            },
            {
                range: {
                    start: 0x11F00,
                    end: 0x11F5F,
                },
                description: "Kawi"
            },
            {
                range: {
                    start: 0x11FB0,
                    end: 0x11FBF,
                },
                description: "Lisu Supplement"
            },
            {
                range: {
                    start: 0x11FC0,
                    end: 0x11FFF,
                },
                description: "Tamil Supplement"
            },
            {
                range: {
                    start: 0x12000,
                    end: 0x123FF,
                },
                description: "Cuneiform"
            },
            {
                range: {
                    start: 0x12400,
                    end: 0x1247F,
                },
                description: "Cuneiform Numbers and Punctuation"
            },
            {
                range: {
                    start: 0x12480,
                    end: 0x1254F,
                },
                description: "Early Dynastic Cuneiform"
            },
            {
                range: {
                    start: 0x12F90,
                    end: 0x12FFF,
                },
                description: "Cypro-Minoan"
            },
            {
                range: {
                    start: 0x13000,
                    end: 0x1342F,
                },
                description: "Egyptian Hieroglyphs"
            },
            {
                range: {
                    start: 0x13430,
                    end: 0x1345F,
                },
                description: "Egyptian Hieroglyph Format Controls"
            },
            {
                range: {
                    start: 0x14400,
                    end: 0x1467F,
                },
                description: "Anatolian Hieroglyphs"
            },
            {
                range: {
                    start: 0x16800,
                    end: 0x16A3F,
                },
                description: "Bamum Supplement"
            },
            {
                range: {
                    start: 0x16A40,
                    end: 0x16A6F,
                },
                description: "Mro"
            },
            {
                range: {
                    start: 0x16A70,
                    end: 0x16ACF,
                },
                description: "Tangsa"
            },
            {
                range: {
                    start: 0x16AD0,
                    end: 0x16AFF,
                },
                description: "Bassa Vah"
            },
            {
                range: {
                    start: 0x16B00,
                    end: 0x16B8F,
                },
                description: "Pahawh Hmong"
            },
            {
                range: {
                    start: 0x16E40,
                    end: 0x16E9F,
                },
                description: "Medefaidrin"
            },
            {
                range: {
                    start: 0x16F00,
                    end: 0x16F9F,
                },
                description: "Miao"
            },
            {
                range: {
                    start: 0x16FE0,
                    end: 0x16FFF,
                },
                description: "Ideographic Symbols and Punctuation"
            },
            {
                range: {
                    start: 0x17000,
                    end: 0x187FF,
                },
                description: "Tangut"
            },
            {
                range: {
                    start: 0x18800,
                    end: 0x18AFF,
                },
                description: "Tangut Components"
            },
            {
                range: {
                    start: 0x18B00,
                    end: 0x18CFF,
                },
                description: "Khitan Small Script"
            },
            {
                range: {
                    start: 0x18D00,
                    end: 0x18D7F,
                },
                description: "Tangut Supplement"
            },
            {
                range: {
                    start: 0x1AFF0,
                    end: 0x1AFFF,
                },
                description: "Kana Extended-B"
            },
            {
                range: {
                    start: 0x1B000,
                    end: 0x1B0FF,
                },
                description: "Kana Supplement"
            },
            {
                range: {
                    start: 0x1B100,
                    end: 0x1B12F,
                },
                description: "Kana Extended-A"
            },
            {
                range: {
                    start: 0x1B130,
                    end: 0x1B16F,
                },
                description: "Small Kana Extension"
            },
            {
                range: {
                    start: 0x1B170,
                    end: 0x1B2FF,
                },
                description: "Nushu"
            },
            {
                range: {
                    start: 0x1BC00,
                    end: 0x1BC9F,
                },
                description: "Duployan"
            },
            {
                range: {
                    start: 0x1BCA0,
                    end: 0x1BCAF,
                },
                description: "Shorthand Format Controls"
            },
            {
                range: {
                    start: 0x1CF00,
                    end: 0x1CFCF,
                },
                description: "Znamenny Musical Notation"
            },
            {
                range: {
                    start: 0x1D000,
                    end: 0x1D0FF,
                },
                description: "Byzantine Musical Symbols"
            },
            {
                range: {
                    start: 0x1D100,
                    end: 0x1D1FF,
                },
                description: "Musical Symbols"
            },
            {
                range: {
                    start: 0x1D200,
                    end: 0x1D24F,
                },
                description: "Ancient Greek Musical Notation"
            },
            {
                range: {
                    start: 0x1D2C0,
                    end: 0x1D2DF,
                },
                description: "Kaktovik Numerals"
            },
            {
                range: {
                    start: 0x1D2E0,
                    end: 0x1D2FF,
                },
                description: "Mayan Numerals"
            },
            {
                range: {
                    start: 0x1D300,
                    end: 0x1D35F,
                },
                description: "Tai Xuan Jing Symbols"
            },
            {
                range: {
                    start: 0x1D360,
                    end: 0x1D37F,
                },
                description: "Counting Rod Numerals"
            },
            {
                range: {
                    start: 0x1D400,
                    end: 0x1D7FF,
                },
                description: "Mathematical Alphanumeric Symbols"
            },
            {
                range: {
                    start: 0x1D800,
                    end: 0x1DAAF,
                },
                description: "Sutton SignWriting"
            },
            {
                range: {
                    start: 0x1DF00,
                    end: 0x1DFFF,
                },
                description: "Latin Extended-G"
            },
            {
                range: {
                    start: 0x1E000,
                    end: 0x1E02F,
                },
                description: "Glagolitic Supplement"
            },
            {
                range: {
                    start: 0x1E030,
                    end: 0x1E08F,
                },
                description: "Cyrillic Extended-D"
            },
            {
                range: {
                    start: 0x1E100,
                    end: 0x1E14F,
                },
                description: "Nyiakeng Puachue Hmong"
            },
            {
                range: {
                    start: 0x1E290,
                    end: 0x1E2BF,
                },
                description: "Toto"
            },
            {
                range: {
                    start: 0x1E2C0,
                    end: 0x1E2FF,
                },
                description: "Wancho"
            },
            {
                range: {
                    start: 0x1E4D0,
                    end: 0x1E4FF,
                },
                description: "Nag Mundari"
            },
            {
                range: {
                    start: 0x1E7E0,
                    end: 0x1E7FF,
                },
                description: "Ethiopic Extended-B"
            },
            {
                range: {
                    start: 0x1E800,
                    end: 0x1E8DF,
                },
                description: "Mende Kikakui"
            },
            {
                range: {
                    start: 0x1E900,
                    end: 0x1E95F,
                },
                description: "Adlam"
            },
            {
                range: {
                    start: 0x1EC70,
                    end: 0x1ECBF,
                },
                description: "Indic Siyaq Numbers"
            },
            {
                range: {
                    start: 0x1ED00,
                    end: 0x1ED4F,
                },
                description: "Ottoman Siyaq Numbers"
            },
            {
                range: {
                    start: 0x1EE00,
                    end: 0x1EEFF,
                },
                description: "Arabic Mathematical Alphabetic Symbols"
            },
            {
                range: {
                    start: 0x1F000,
                    end: 0x1F02F,
                },
                description: "Mahjong Tiles"
            },
            {
                range: {
                    start: 0x1F030,
                    end: 0x1F09F,
                },
                description: "Domino Tiles"
            },
            {
                range: {
                    start: 0x1F0A0,
                    end: 0x1F0FF,
                },
                description: "Playing Cards"
            },
            {
                range: {
                    start: 0x1F100,
                    end: 0x1F1FF,
                },
                description: "Enclosed Alphanumeric Supplement"
            },
            {
                range: {
                    start: 0x1F200,
                    end: 0x1F2FF,
                },
                description: "Enclosed Ideographic Supplement"
            },
            {
                range: {
                    start: 0x1F300,
                    end: 0x1F5FF,
                },
                description: "Miscellaneous Symbols and Pictographs"
            },
            {
                range: {
                    start: 0x1F600,
                    end: 0x1F64F,
                },
                description: "Emoticons"
            },
            {
                range: {
                    start: 0x1F650,
                    end: 0x1F67F,
                },
                description: "Ornamental Dingbats"
            },
            {
                range: {
                    start: 0x1F680,
                    end: 0x1F6FF,
                },
                description: "Transport and Map Symbols"
            },
            {
                range: {
                    start: 0x1F700,
                    end: 0x1F77F,
                },
                description: "Alchemical Symbols"
            },
            {
                range: {
                    start: 0x1F780,
                    end: 0x1F7FF,
                },
                description: "Geometric Shapes Extended"
            },
            {
                range: {
                    start: 0x1F800,
                    end: 0x1F8FF,
                },
                description: "Supplemental Arrows-C"
            },
            {
                range: {
                    start: 0x1F900,
                    end: 0x1F9FF,
                },
                description: "Supplemental Symbols and Pictographs"
            },
            {
                range: {
                    start: 0x1FA00,
                    end: 0x1FA6F,
                },
                description: "Chess Symbols"
            },
            {
                range: {
                    start: 0x1FA70,
                    end: 0x1FAFF,
                },
                description: "Symbols and Pictographs Extended-A"
            },
            {
                range: {
                    start: 0x1FB00,
                    end: 0x1FBFF,
                },
                description: "Symbols for Legacy Computing"
            },
        ]
    },

    {
        planeNumber: 2,
        description: "Supplementary Ideographic Plane",
        range: {
            start: 0x20000,
            end: 0x2FFFF,
        },
        blocks: [

            {
                range: {
                    start: 0x20000,
                    end: 0x2A6DF,
                },
                description: "CJK Unified Ideographs Extension B"
            },
            {
                range: {
                    start: 0x2A700,
                    end: 0x2B73F,
                },
                description: "CJK Unified Ideographs Extension C"
            },
            {
                range: {
                    start: 0x2B740,
                    end: 0x2B81F,
                },
                description: "CJK Unified Ideographs Extension D"
            },
            {
                range: {
                    start: 0x2B820,
                    end: 0x2CEAF,
                },
                description: "CJK Unified Ideographs Extension E"
            },
            {
                range: {
                    start: 0x2CEB0,
                    end: 0x2EBEF,
                },
                description: "CJK Unified Ideographs Extension F"
            },
            {
                range: {
                    start: 0x2EBF0,
                    end: 0x2EE5F,
                },
                description: "CJK Unified Ideographs Extension I"
            },
            {
                range: {
                    start: 0x2F800,
                    end: 0x2FA1F,
                },
                description: "CJK Compatibility Ideographs Supplement"
            },
        ]
    },
    {
        planeNumber: 3,
        description: "Tertiary Ideographic Plane",
        range: {
            start: 0x30000,
            end: 0x3FFFF,
        },
        blocks: [

            {
                range: {
                    start: 0x30000,
                    end: 0x3134F,
                },
                description: "CJK Unified Ideographs Extension G"
            },
            {
                range: {
                    start: 0x31350,
                    end: 0x323AF,
                },
                description: "CJK Unified Ideographs Extension H"
            },
        ]
    },
    /* Planes 4-13 are unassigned */
    {
        planeNumber: 14,
        description: "Supplementary Special-purpose Plane",
        range: {
            start: 0xE0000,
            end: 0xEFFFF,
        },
        blocks: [

            {
                range: {
                    start: 0xE0000,
                    end: 0xE007F,
                },
                description: "Tags"
            },
            {
                range: {
                    start: 0xE0100,
                    end: 0xE01EF,
                },
                description: "Variation Selectors Supplement"
            },
        ]
    },
    {
        planeNumber: 15,
        description: "Supplementary Private Use Area-A",
        range: {
            start: 0xF0000,
            end: 0xFFFFF,
        },
        blocks: [
            {
                range: {
                    start: 0xF0000,
                    end: 0xFFFFF,
                },
                description: "Supplementary Private Use Area-A"
            },
        ]
    },
    {
        planeNumber: 16,
        description: "Supplementary Private Use Area-B",
        range: {
            start: 0x100000,
            end: 0x10FFFF,
        },
        blocks: [
            {
                range: {
                    start: 0x100000,
                    end: 0x10FFFF,
                },
                description: "Supplementary Private Use Area-B"
            },
        ]
    },
]
