import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null)
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card className="container">
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardText>{dish.description}</CardText>
                <CardTitle>{dish.name}</CardTitle>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-5 m-1">
            <Card className="container">
              <h4 >Comments</h4>
              <CardBody>
                {dish.comments.map((comments) => {
                  return (
                    <CardText>
                    <div>{comments.comment}</div>
                    <br />
                    <div >{`--${comments.author}, ${(new Date(comments.date).toDateString())}`}</div>
                    <br />
                  </CardText>
                  );
                })}
              </CardBody>
            </Card>
          </div>
        </div>
      );
    else return <div></div>;
  }
  render() {
    return <div>{this.renderDish(this.props.SelectedDish)}</div>;
  }
}
export default DishDetail;
