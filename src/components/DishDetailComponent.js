import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CreateComment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      
    });

  }
  handleSubmit = (values) => {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  };
  render() {
    return(<div>
                <Button outline color="secondary" onClick={this.toggleModal}>
                  <i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment
                </Button>
         
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
          <Row className="form-group">
            <Label htmlFor="rating" sm={12}>
            <strong> Rating</strong>
            </Label>
            <Col md={10}>
              <Control.select
                model=".rating"
                id="rating"
                name="rating"
                className="form-control"
              >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              </Control.select>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="author" md={12}>
              <strong>Your Name</strong>
            </Label>
            <Col md={10}>
              <Control.text
                model=".author"
                id="author"
                name="author"
                placeholder="Your Name"
                className="form-control"
                validators={{
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="comment" md={12}>
             <strong>Comment</strong>
            </Label>
            <Col md={10}>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows="8"
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col md={{ size: 10 }}>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </LocalForm>
          </ModalBody>
        </Modal>
        </div>
    )
  }
}
function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardText>{dish.description}</CardText>
          <CardTitle>{dish.name}</CardTitle>
        </CardBody>
      </div>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments(props) {
  var addComment=props.addComment;
  var dishId=props.dishId;
  if (props != null) {
    return (
      <Card className="container">
        <h4>Comments</h4>
        <CardBody>
          {props.comments.map((comments) => {
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
          <CreateComment dishId={dishId} addComment={addComment}/>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail =(props)=> {
 
  
    return (
      <div class="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">{RenderDish(props)}</div>

          <div className="col-12 col-md-5 m-1">
           
          <RenderComments comments={props.comments}
          addComment={props.addComment}
          dishId={props.dish.id}
        />
        </div>
      </div>
      </div>
    );
  }

export default DishDetail;
