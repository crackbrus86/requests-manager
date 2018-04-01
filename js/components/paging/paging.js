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
        this.handlePageChange = (e) => {
            if(e.target.dataset["rel"] !== '...'){
                this.props.changePage(e.target.dataset["rel"]);
            }
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

    fPages(){
        var count = this.state.count;
        var current = parseInt(this.state.current);
        var pages = [];
        if(count > 6){
            var start = [1, 2, 3];
            var end = [count - 2, count - 1, count];
            var middle = [];
            if(current > 2 && (current < (count - 1))){
                var prev = current - 1;
                var next = current + 1;
                if(prev > 4) middle.push('...');
                if(prev > 3) middle.push(prev);
                if(current > 3 && current < (count - 2)) middle.push(current);
                if(next < count -2) middle.push(next);
                if(count - 2 - next > 1) middle.push('...');
            }else{
                middle.push('...');
            }
            pages = pages.concat(start, middle, end);
        }else{
            for(var i = 1; i <= this.state.count; i++){
                pages.push(i);
            }
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
        this.fPages();        
    }

    render(){
        var pageLinks = this.state.pages.map((page, index) => {
            var className = (page == this.state.current)? "active" : null;
            return <li key={index} className={classNames(className)}>
                    <a href="javascript:void(0)" data-rel={page} onClick={this.handlePageChange}>{page}</a>
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