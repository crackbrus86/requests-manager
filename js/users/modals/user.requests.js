import React from "react"
import Modal from "../../components/modal/modal"
import * as services from "../services/services";
import moment from "moment"
import Grid from "../../components/grid/grid"
import Preloader from "../../components/preloader/preloader"

class UserRequests extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            years: [],
            requests: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.setYears()
        if(!!this.props.userId) this.loadRequests()
    }

    loadRequests(){
        this.setState({isLoading: true})
        services.getUserRequests({
            userId: this.props.userId,
            year: this.state.year
        }).then(result => {
            this.setState({requests: JSON.parse(result), isLoading: false})
        })
    }

    setYears(){
        let years = []
        for(let i = this.state.year - 5; i <= this.state.year + 1; i++){
            years.push(i)
        }
        this.setState({years: years})
    }

    onChangeYear(year){
        this.setState({year: year}, () => this.loadRequests())
    }
    render(){
        var columns = [
            {
                title: "Змагання",
                field: "eventTitle",
                width: "250px"
            },
            {
                title: "Дата подання",
                field: "createdDate",
                width: "120px"
            }
        ];
        var rows = this.state.requests.map(x => {
            return {
                requestId: x.requestId,
                eventTitle: x.eventTitle,
                createdDate: moment(new Date(x.createdDate)).format("DD/MM/YYYY")
            }
        })
        return <Modal target={this.props.userId} className="user-request-modal" onClose={() => this.props.onClose()}>
                    <h3>Заявки спортсмена</h3>
                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Рік</label>
                                <select value={this.state.year} className="form-control" onChange={e => this.onChangeYear(e.target.value)}>
                                    {
                                        this.state.years.map((y, index) => <option key={index}>{y}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                    <div>
                        {
                            !!this.state.requests.length ?
                            <Grid data={{columns, rows}} /> :
                            <p>Не знайдено змагань за цей рік</p>
                            
                        }
                    </div>
                    <Preloader loading={this.state.isLoading}/>
                </Modal>
    }
}
export default UserRequests