import React, { useState } from 'react'
import Accordion from './Components/Accordion'
import Search from './Components/Search'
import Dropdown from './Components/Dropdown'
import Translate from './Components/Translate'
import Route from './Components/Route'
import Header from './Components/Header'
const items = [
    {
        title: 'What is React?',
        context: 'React is a JS library used from Frontend engineers.'
    },
    {
        title: 'What are hooks in React?',
        context: 'Hooks are a way to write reusable content in ReactJS.'
    },
    {
        title: 'Why use React?',
        context: 'Because it is favorite JS library develpoed my Meta or Facebook'
    }
]

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'The Color Yellow',
        value: 'yellow'
    }
]

export default () => {
    const [selected, setSelected] = useState(options[0])

    //          used to hide the sections
    //const [showDropdown, setShowDropdown] = useState(true)
    {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button> */ }

    return (
        <div>
            <Header />
            <Route path='/'>
                <Accordion
                    items={items}
                />
            </Route>
            <Route path='/list'>
                <Search />
            </Route>
            <Route path='/dropdown'>
                <Dropdown
                    label='Select a Color'
                    selected={selected}
                    setSelected={setSelected}
                    options={options}
                />
            </Route>
            <Route path='/translate'>
                <Translate />
            </Route>
        </div>
    )
}