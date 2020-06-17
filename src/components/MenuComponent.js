import React,{Component} from 'react';
import {Card,CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import DishDetail from './DishDetailComponent';
import {DISHES} from '../shared/dishes';

class Menu extends Component{
	 constructor (props){
        super(props);
        this.state = {
        dishes : DISHES,
        SelectedDish : null
   		}
   	}	
	OnDishSelect(dish){
		this.setState({SelectedDish:dish});

	}
	render() {
		const menu = this.state.dishes.map(
		(dish)=>{
			return(
			<div className = "col-12 col-md-5 m-1">
				<Card key = {dish.id} 
					onClick = {()=>this.OnDishSelect(dish)}>
					<CardImg width = "100%" src = {dish.image} alt = {dish.name}/>
					<CardImgOverlay>
						<CardTitle>{dish.name}</CardTitle>
					</CardImgOverlay>
				</Card>
			</div>
			);
		});
		
		return(
		<div className = "container">
			<div className = "row">
			{menu}
			</div>
			<div className = "row">
			<DishDetail SelectedDish = {this.state.SelectedDish} />
			</div> 	
		</div>
		);
	}
}
export default Menu;
