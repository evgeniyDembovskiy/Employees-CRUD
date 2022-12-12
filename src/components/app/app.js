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
                {name: "John C.", salary: 4000, increase: false, rise: true, id: 1},
                {name: "Alex M.", salary: 8000, increase: true, rise: false, id: 2},
                {name: "Carl W.", salary: 6000, increase: false, rise: false, id: 3},
            ],
            term: "",
            filter: "all",
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

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    serachEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    filterItems = (items, filter) => {
        if (filter === "all") {
            return items;
        } else if (filter === "rise") {
            return items.filter(item => {
                return item.rise
            })
        } else if (filter === "more") {
            return items.filter(item => {
                return item.salary > 1000
            })
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onUpdateFilter = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const totalCount = data.length;
        const increaseCount = data.reduce((count, current) => current.increase ? ++count : count, 0);
        const visibleData = this.filterItems(this.serachEmp(data, term), filter) ;

        return (
            <div className="app">
                <AppInfo
                    totalCount={totalCount}
                    increaseCount={increaseCount}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter onUpdateFilter={this.onUpdateFilter}
                    filter={filter}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onSubmit={this.addItem}/>
            </div>
        );
    }
}

export default App;