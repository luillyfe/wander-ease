'use client';

import { useState } from 'react';

interface TravelDetails {
    origin: string | null;
    destination: string | null;
    dates: {
        start: string | null;
        end: string | null;
    };
    deadline: string | null;
}

interface ParsedInput {
    origin: string;
    destination: string;
    date: string;
    isValid: boolean;
}

// TODO: We must use a NLP-based for entity extraction like Gemma2.
const parseInput = (input: string): ParsedInput => {
    // Extract origin
    const originMatch = input.match(/from\s+([A-Za-z\s]+?)(?=\s+to|\s+on|\s+next|\s+in|\s+\d{1,2}|$)/i);
    const origin = originMatch?.[1]?.trim();

    // Extract destination
    const destinationMatch = input.match(/to\s+([A-Za-z\s]+?)(?=\s+on|\s+next|\s+in|\s+\d{1,2}|$)/i);
    const destination = destinationMatch?.[1]?.trim();

    // Date patterns with named capture groups
    const datePatterns = [
        /(?<relative>next\s+(?:week|month))/i,
        /(?<relative>in\s+\d+\s+(?:days?|weeks?|months?))/i,
        /(?<specific>\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*(?:\d{4})?)/i,
        /(?<specific>(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?\s*(?:\d{4})?)/i,
        /(?<relative>(?:tomorrow|today|next\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)))/i,
        /(?<specific>\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i
    ];

    // Find the first matching date pattern
    let dateStr = null;
    for (const pattern of datePatterns) {
        const match = input.match(pattern);
        if (match?.groups) {
            dateStr = match[0];
            break;
        }
    }

    return {
        origin: origin || '',
        destination: destination || '',
        date: dateStr || '',
        isValid: Boolean(origin && destination && dateStr)
    };
};

export default function Page() {
    const [userInput, setUserInput] = useState('');
    const [deadline, setDeadline] = useState('');
    const [needsClarification, setNeedsClarification] = useState(false);
    const [travelDetails, setTravelDetails] = useState<TravelDetails>({
        origin: null,
        destination: null,
        dates: {
            start: null,
            end: null,
        },
        deadline: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);

        // Reset clarification state when input changes
        if (needsClarification) {
            setNeedsClarification(false);
        }
    };

    const handleSubmit = () => {
        const parsed = parseInput(userInput);

        if (parsed.isValid) {
            setTravelDetails({
                origin: parsed.origin,
                destination: parsed.destination,
                dates: {
                    start: parsed.date,
                    end: null, // Could be enhanced to parse date ranges
                },
                deadline: deadline.trim() || null,
            });
        } else {
            setNeedsClarification(true);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
            data-oid="7-01ezz"
        >
            <div className="container mx-auto px-4 py-16" data-oid="0g619ts">
                <div className="text-center mb-16" data-oid="4ux.bap">
                    <h1
                        className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-4"
                        data-oid="lhjxfdz"
                    >
                        AI Travel Agent
                    </h1>
                    <p className="text-purple-200 text-xl" data-oid="31dmh4q">
                        Your personal AI travel companion
                    </p>
                </div>

                <div
                    className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
                    data-oid="ela88ko"
                >
                    <div className="space-y-6" data-oid=":bh1wy8">
                        <div className="space-y-4" data-oid="lrp2eyk">
                            <div className="flex items-center space-x-4" data-oid="s9d_qj1">
                                <div
                                    className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center"
                                    data-oid="ybod9a-"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="qvrs.lu"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                            data-oid="q1d:x4k"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Example: from New York to Paris next week"
                                    className="flex-1 bg-white/5 border border-purple-300/20 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={userInput}
                                    onChange={handleInputChange}
                                    data-oid="z_2:lhg"
                                />
                            </div>

                            <div className="flex items-center space-x-4" data-oid="xf_0gd.">
                                <div
                                    className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center"
                                    data-oid=":3lez07"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="fmdq-38"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            data-oid="kdfj:ii"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1 relative" data-oid="uw-:t82">
                                    <input
                                        type="text"
                                        placeholder="Set a deadline for finding options (e.g., within 2 days)"
                                        className="w-full bg-white/5 border border-purple-300/20 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        data-oid="h.6rf4b"
                                    />

                                    {deadline && (
                                        <div
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            data-oid="1yrq8xo"
                                        >
                                            <span
                                                className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full"
                                                data-oid="nrqmcyz"
                                            >
                                                Deadline Set
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {needsClarification && (
                            <div className="mt-4 p-4 bg-pink-500/20 rounded-lg" data-oid="tvrltta">
                                <p className="text-pink-200 mb-2" data-oid="fzhi6g-">
                                    Please provide:
                                </p>
                                <ul
                                    className="list-disc list-inside text-pink-100"
                                    data-oid="qb57dxl"
                                >
                                    <li data-oid="sehx3ur">Origin city (starting with "from")</li>
                                    <li data-oid="zcn-1zl">
                                        Destination city (starting with "to")
                                    </li>
                                    <li data-oid="-4cys79">
                                        Travel dates (like "next week", "January 15th", "in 2
                                        weeks")
                                    </li>
                                </ul>
                                <p className="text-pink-200 mt-2 text-sm" data-oid="yc..0qh">
                                    Examples:
                                    <br data-oid="fqd9l39" />
                                    "from New York to Paris next week"
                                    <br data-oid=":7xsn_j" />
                                    "from London to Tokyo January 15th"
                                    <br data-oid="c1ax9c5" />
                                    "from Miami to Barcelona in 2 weeks"
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl"
                            data-oid="-aodkk1"
                        >
                            Plan My Journey
                        </button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="87mtdu:">
                        <div
                            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                            data-oid="a4ef8xg"
                        >
                            <div className="text-purple-300 mb-2" data-oid="z:y.wzt">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="66_n0q2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                        data-oid="1c0x6cb"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold text-purple-100 mb-2"
                                data-oid="r.bks:u"
                            >
                                Lightning Fast
                            </h3>
                            <p className="text-purple-200/70" data-oid="1k-0ox.">
                                Get personalized travel recommendations in seconds
                            </p>
                        </div>

                        <div
                            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                            data-oid="d7svvuk"
                        >
                            <div className="text-purple-300 mb-2" data-oid="j27cl93">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="h:6b:em"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        data-oid="otg_om5"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold text-purple-100 mb-2"
                                data-oid="psx7_vp"
                            >
                                Smart Planning
                            </h3>
                            <p className="text-purple-200/70" data-oid="osaum8a">
                                AI-powered itineraries tailored to your preferences
                            </p>
                        </div>

                        <div
                            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                            data-oid="zl:tiy-"
                        >
                            <div className="text-purple-300 mb-2" data-oid="oczzfl:">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="o1ssi1r"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        data-oid="a8kxosi"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold text-purple-100 mb-2"
                                data-oid="_s.umk."
                            >
                                Best Deals
                            </h3>
                            <p className="text-purple-200/70" data-oid="c1056tf">
                                Automatically find the most cost-effective options
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center" data-oid="..kjehk">
                        <p className="text-purple-200/70" data-oid="yieno__">
                            Powered by advanced AI to make your travel planning effortless
                        </p>
                        <div className="mt-4 flex justify-center space-x-4" data-oid="_gsi26y">
                            <span
                                className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                                data-oid="0zn1f7."
                            >
                                GenAI Powered
                            </span>
                            <span
                                className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                                data-oid="gsia1b7"
                            >
                                24/7 Available
                            </span>
                            <span
                                className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                                data-oid="-bthy6j"
                            >
                                Real-time Updates
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}