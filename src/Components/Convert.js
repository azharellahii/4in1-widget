import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {

    const [translated, setTranslated] = useState('')
    const [debouncedText, setDebouncedText] = useState(text)
    const [error, setError] = useState(false)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        }, 500);

        return () => {
            clearTimeout(timerId)
        }

    }, [text])


    useEffect(() => {

        const doTranslation = async () => {
            try {

                const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                    params: {
                        q: debouncedText,
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                })
                setTranslated(data.data.translations[0].translatedText)
            }
            catch (err) {
                console.log(err)
                setError(true)
            }
        }
        doTranslation()
    }, [language, debouncedText])

    return (
        <div>
            {error ?
                'Something wrong with api'
                :
                <h1 className="ui header">{translated}</h1>
            }
        </div>
    )


}


export default Convert