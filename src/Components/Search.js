import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
    const [input, setInput] = useState('Kashmir');
    const [debouncedInput, setDebouncedInput] = useState('input')
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedInput(input);
        }, 1000)
        return () => {
            clearTimeout(timerId)
        }
    }, [input])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedInput,
                }
            })

            setResults(data.query.search);
        }
        search()
    }, [debouncedInput])
    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* Code below is used to remove HTML tags also called XSS attack in React */}
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>What you looking for!!!</label>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="input" />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}


export default Search;