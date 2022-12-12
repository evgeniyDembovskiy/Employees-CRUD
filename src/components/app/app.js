import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 4000, increase: false, rise:true, id: 1},
                {name: "Alex M.", salary: 8000, increase: true, rise:false, id: 2},
                {name: "Carl W.", salary: 6000, increase: false, rise:false, id: 3},
            ]
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newData = this.state.data
        newData.push({
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId,
        });
        this.setState({
            data: newData
        })
        this.maxId += 1;
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        console.log(`Rise this ${id}`);
    }

    render() {
        const totalCount = this.state.data.length;
        const increaseCount = this.state.data.reduce((count, current) => current.increase ? ++count : count, 0)
        return (
            <div className="app">
                <AppInfo
                    totalCount={totalCount}
                    increaseCount={increaseCount}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployeesAddForm
                    onSubmit={this.addItem}/>
            </div>
        );
    }
}

export default App;