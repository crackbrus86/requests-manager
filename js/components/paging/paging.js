import React from "react";
var classNames = require("classnames");

class Paging extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            perPage: this.props.paging.perPage,
            total: this.props.paging.total,
            current: this.props.paging.current,
            count: 0,
            pages: []
        }
    }
    setupCount(){
        this.setState({count: Math.ceil(this.state.total / this.state.perPage)})
    }
    fetchPages(){
        var pages = [];
        for(var i = 1; i <= this.state.count; i++){
            pages.push(i);
        }
        this.setState({pages: pages});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            perPage: nextProps.paging.perPage,
            total: nextProps.paging.total,
            current: nextProps.paging.current            
        });
        this.setupCount();
        this.fetchPages();        
    }

    render(){
        var pageLinks = this.state.pages.map(page => {
            var className = (page == this.state.current)? "active" : null;
            return <li key={page} className={classNames(className)}>
                    <a href="javascript:void(0)" data-rel={page} onClick={(e) => this.props.changePage(e.target.dataset["rel"])}>{page}</a>
                </li>
        })
        if(this.state.count < 2) return null;
        return <div>
            <nav><ul className="pagination">
                {pageLinks}
            </ul></nav>
        </div>
    }
}
export default Paging;