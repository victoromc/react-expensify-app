import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate } from '../actions/filters'
import {DateRangePicker} from 'react-dates';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
        
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }
    render() {
        return (
            <div>
                <input type="text"
                    placeholder="Buscar por nome"
                    value={this.props.filters.text} onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }} />
                <select
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        if (e.target.value === 'date') {
                            this.props.dispatch(sortByDate())
                        } else if (e.target.value === 'amount') {
                            this.props.dispatch(sortByAmount())
                        }
                    }}
                >
                    <option value="date">Ordernar por Data</option>
                    <option value="amount" >Ordernar por Preço</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}

                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
}

export default connect(mapStateToProps)(ExpenseListFilters);