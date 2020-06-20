import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div>
        <Card className="container">
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardText>{dish.description}</CardText>
            <CardTitle>{dish.name}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ dish }) {
  if (dish != null) {
    return (
      <Card className="container">
        <h4>Comments</h4>
        <CardBody>
          {dish.comments.map((comments) => {
            return (
              <CardText>
                <div>{comments.comment}</div>
                <br />
                <div>{`--${comments.author}, ${new Intl.DateTimeFormat(
                  "en-US",
                  { year: "numeric", month: "short", day: "2-digit" }
                ).format(new Date(Date.parse(comments.date)))}`}</div>
                <br />
              </CardText>
            );
          })}
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  return (
    <div class="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">{RenderDish(props)}</div>
        <div className="col-12 col-md-5 m-1">{RenderComments(props)}</div>
      </div>
    </div>
  );
};

export default DishDetail;
