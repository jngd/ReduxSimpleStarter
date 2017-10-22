import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  // Wire up field props in JSX
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          // Wire up all onChange, onFocus, ...
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            // piece of state
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            // piece of state
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            // piece of state
            label="Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> {title: ...}
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter a categorie!";
  }

  if (!values.content) {
      errors.content = "Enter a content!";
  }
  // errors === {} -> form ok!
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(null,{createPost})(PostsNew)
);
