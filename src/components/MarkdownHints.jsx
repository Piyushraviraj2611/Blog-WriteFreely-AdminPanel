import React, { useRef } from 'react'
import { useEffect } from 'react';

const mdRules = [
    { title: "From h1 to h6", rule: "# Heading -> ###### Heading", key: "mdRule1" },
    { title: "Blockquote", rule: "> Your Quote", key: "mdRule2" },
    { title: "Image", rule: "![alt text](https://image_url.com)", key: "mdRule3" },
    { title: "Link", rule: "[Link Text](https://link_url.com)", key: "mdRule4" },
    { title: "Bold", rule: "**Bold Text**", key: "mdRule5" },
    { title: "Italic", rule: "*Italic Text*", key: "mdRule6" },
    { title: "Strikethrough", rule: "~~Strikethrough Text~~", key: "mdRule7" }
];

const MarkdownHints = () => {
    const markDownHintsRef = useRef();

    useEffect(() => {
        markDownHintsRef.current?.classList.remove("translate-y-5", "opacity-0");
        setTimeout(() => {
            markDownHintsRef.current?.classList.add("-translate-y-7", "opacity-1");
        }, 100);
    }, [])

    return (
        <div ref={markDownHintsRef} className="bg-white px-2 py-4 rounded translate-y-5 opacity-0 transition mt-10">
            <h2 className='font-semibold text-center'>General Markdown Rules</h2>
            <ul className='space-y-2'>
                {mdRules.map(rule => (
                    <li key={rule.key}>
                        <p className='font-semibold text-gray-500'>{rule.title}</p>
                        <p className='font-semibold text-gray-700 pl-2 font-mono'>{rule.rule}</p>
                    </li>
                ))}
                <li className='text-center text-blue-500'>
                    <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className='text-blue-500 hover:text-blue-700'>Find out more</a>
                </li>
            </ul>
        </div>
    )
}

export default MarkdownHints