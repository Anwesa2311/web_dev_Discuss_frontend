import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import './ClassModifier.css';

import ClassDataService from '../services/ClassDataService';
import AppContext from '../AppContext';

const ClassModifier = ({ editMode = false }) => {
  const { user, dispatch } = useContext(AppContext);
  const ref = useRef();
  const { classroomId: classId } = useParams();

  const [errors, setErrors] = useState({});
  const [yearsSelect, setYearsSelect] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [uniSelect, setUniSelect] = useState([]);
  const navigate = useNavigate();
  const [formToggle, setFormToggle] = useState(true);

  const toggle = () => {
    setInstructors([]);
    setErrors({});
    setFormToggle(!formToggle);
  };

  const validateForm = (formDataObj) => {
    let newErrors = {};
    if (!formDataObj['cNumber'] || formDataObj['cNumber'].trim() === '') {
      newErrors.formCourseNumber = 'Enter a valid course number.';
    }
    if (!formDataObj['cSection'] || formDataObj['cSection'].trim() === '') {
      newErrors.formCourseSection = 'Enter a valid course section.';
    }
    if (
      !formDataObj['university'] ||
      formDataObj['university'].trim() === '' ||
      formDataObj['university'].trim() === '-1'
    ) {
      newErrors.formUniversity = 'Choose a university.';
    }
    if (
      !formDataObj['season'] ||
      formDataObj['season'].trim() === '' ||
      formDataObj['season'].trim() === '-1'
    ) {
      newErrors.season = 'Pick a proper season.';
    }
    if (
      !formDataObj['year'] ||
      formDataObj['year'].trim() === '' ||
      formDataObj['year'].trim() === '-1'
    ) {
      newErrors.year = 'Pick a proper year.';
    }
    if (formToggle) {
      if (
        !formDataObj['cDescription'] ||
        formDataObj['cDescription'].trim() === ''
      ) {
        newErrors.formCourseDescription = 'Enter a valid course description.';
      }
    } else {
      // if (
      //   !formDataObj['pass'] ||
      //   formDataObj['pass'].trim() === '' ||
      //   formDataObj['pass'].length < 8
      // ) {
      //   newErrors.formPass = 'Enter a password with at least 8 characters.';
      // }
    }
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const create = (data) => {
    ClassDataService.create(data)
      .then((res) => {
        const newUser = { ...user };
        newUser.instructor.push(res.data.id);
        dispatch({ type: 'SET_USER', user: newUser });
        NotificationManager.success('Class created.');
        navigate(`/classroom/${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.response.data.error);
      });
  };

  const edit = (data) => {
    ClassDataService.update(data)
      .then((res) => {
        NotificationManager.success('Class edit succeeded.');
        navigate(`/classroom/${classId}`);
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.response.data.error);
      });
  };

  const join = (data) => {
    ClassDataService.join(data)
      .then((res) => {
        const newUser = { ...user };

        newUser.student.push(res.data.id);
        dispatch({ type: 'SET_USER', user: newUser });
        NotificationManager.success('Class joined successfully.');
        navigate(`/classroom/${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.response.data.error);
      });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    if (!validateForm(formDataObj)) {
      NotificationManager.warning('Please fill the form properly.');
      return;
    }
    if (formToggle) {
      let data = {};
      data['user'] = user;
      data['cDescription'] = formDataObj['cDescription'];
      data['cNumber'] = formDataObj['cNumber'];
      data['cSection'] = formDataObj['cSection'];
      data['term'] = formDataObj['season'] + '-' + formDataObj['year'];
      data['university'] = formDataObj['university'];
      data['instructors'] = instructors;
      if (editMode) {
        data['id'] = classId;
        edit(data);
      } else {
        create(data);
      }
    } else {
      let data = {};
      data['user'] = user;
      data['cNumber'] = formDataObj['cNumber'];
      data['cSection'] = formDataObj['cSection'];
      data['term'] = formDataObj['season'] + '-' + formDataObj['year'];
      data['university'] = formDataObj['university'];
      data['password'] = formDataObj['pass'];
      join(data);
    }
  };

  useEffect(() => {
    let year = new Date().getFullYear() + 3;
    let years = [];
    for (let i = 2000; i < year; i++) {
      years.push(i);
    }
    setYearsSelect(
      years.length > 0 &&
        years.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        }, this)
    );
  }, []);

  useEffect(() => {
    ClassDataService.getUniversities()
      .then((res) => {
        setUniSelect(
          res.data.universities.length > 0 &&
            res.data.universities.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            }, this)
        );
        if (editMode) {
          ClassDataService.get(classId)
            .then((res) => {
              console.log(res.data.classResp);
              console.log(ref);
              ref.current['user'] = user;
              ref.current['formUniversity'].value =
                res.data.classResp['university'];
              ref.current['cDescription'].value =
                res.data.classResp['description'];
              ref.current['formCourseNumber'].value =
                res.data.classResp['course_number'];
              ref.current['cSection'].value = res.data.classResp['section'];
              ref.current['season'].value = res.data.classResp[
                'semester'
              ].slice(0, res.data.classResp.semester.lastIndexOf('-'));
              ref.current['year'].value = res.data.classResp['semester'].slice(
                res.data.classResp.semester.lastIndexOf('-') + 1,
                res.data.classResp['semester'].length
              );
              setInstructors(res.data.classResp.instructorEmails);
            })
            .catch((e) => {
              console.log(e);
              NotificationManager.error('Error in getting class.');
            });
        }
      })
      .catch((e) => {
        NotificationManager.error('Error in getting universities.');
        console.log(e);
      });
  }, []);

  return (
    <div className='container-wrapper'>
      {formToggle && (
        <div>
          <h1 className='form-head'>Create a class</h1>
          <Form
            onSubmit={onFormSubmit}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
            ref={ref}
          >
            <Form.Group className='mb-3' controlId='formUniversity'>
              <Form.Label>University</Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='university'
                isInvalid={!!errors.formUniversity}
              >
                <option key='!default' value={-1}>
                  Select University
                </option>
                {uniSelect}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.formUniversity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseNumber'>
              <Form.Label>Course Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course Number'
                name='cNumber'
                isInvalid={!!errors.formCourseNumber}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formCourseNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formTerm'>
              <Form.Label>Term</Form.Label>
              <div className='d-flex'>
                <div className='mx-3 mb-3 w-50 left-margin-0'>
                  <Form.Select
                    aria-label='Default select example'
                    name='year'
                    isInvalid={!!errors.year}
                  >
                    <option key='!default' value={-1}>
                      Select year
                    </option>
                    {yearsSelect}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.year}
                  </Form.Control.Feedback>
                </div>
                <div className='mx-3 mb-3 w-50 right-margin-0'>
                  <Form.Select
                    aria-label='Default select example'
                    name='season'
                    isInvalid={!!errors.season}
                  >
                    <option key='!default' value={-1}>
                      Select season
                    </option>
                    <option value='Fall'>Fall</option>
                    <option value='Winter'>Winter</option>
                    <option value='Spring'>Spring</option>
                    <option value='Summer'>Summer</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.season}
                  </Form.Control.Feedback>
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseSection'>
              <Form.Label>Course Section</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course Section'
                name='cSection'
                isInvalid={!!errors.formCourseSection}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formCourseSection}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseDescription'>
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                placeholder='Enter Course Description'
                name='cDescription'
                isInvalid={!!errors.formCourseDescription}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formCourseDescription}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseSection'>
              <Form.Label>Add instructors</Form.Label>
              <EmailInput
                instructors={instructors}
                setInstructors={setInstructors}
              />
            </Form.Group>

            {!editMode && (
              <p className='forgot-password text-right'>
                Already have a class?{' '}
                <Button variant='link' onClick={toggle}>
                  Join a class
                </Button>
              </p>
            )}
            <Button className='classJoinBtn' variant='primary' type='submit'>
              {editMode ? 'Edit' : 'Create'}
            </Button>
          </Form>
        </div>
      )}
      {!formToggle && (
        <div>
          <h1 className='form-head'>Join a class</h1>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className='mb-3' controlId='formUniversity'>
              <Form.Label>University</Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='university'
                isInvalid={!!errors.formUniversity}
              >
                <option key='!default' value={-1}>
                  Select University
                </option>
                {uniSelect}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.formUniversity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseNumber'>
              <Form.Label>Course Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course Number'
                name='cNumber'
                isInvalid={!!errors.formCourseNumber}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formCourseNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formTerm'>
              <Form.Label>Term</Form.Label>
              <div className='d-flex'>
                <div className='mx-3 mb-3 w-50 left-margin-0'>
                  <Form.Select
                    aria-label='Default select example'
                    name='year'
                    isInvalid={!!errors.year}
                  >
                    <option key='!default' value={-1}>
                      Select year
                    </option>
                    {yearsSelect}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.year}
                  </Form.Control.Feedback>
                </div>
                <div className='mx-3 mb-3 w-50 right-margin-0'>
                  <Form.Select
                    aria-label='Default select example'
                    name='season'
                    isInvalid={!!errors.season}
                  >
                    <option key='!default' value={-1}>
                      Select season
                    </option>
                    <option value='Fall'>Fall</option>
                    <option value='Winter'>Winter</option>
                    <option value='Spring'>Spring</option>
                    <option value='Summer'>Summer</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.season}
                  </Form.Control.Feedback>
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCourseSection'>
              <Form.Label>Course Section</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course Section'
                name='cSection'
                isInvalid={!!errors.formCourseSection}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formCourseSection}
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group className='mb-3' controlId='formPass'>
              <Form.Label>Join Password</Form.Label>
              <Form.Control
                type='password'
                name='pass'
                isInvalid={!!errors.formPass}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.formPass}
              </Form.Control.Feedback>
            </Form.Group> */}
            <p className='forgot-password text-right'>
              No class?{' '}
              <Button variant='link' onClick={toggle}>
                Create a class
              </Button>
            </p>
            <Button className='classJoinBtn' variant='primary' type='submit'>
              Join
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

const EmailInput = (props) => {
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  // const [instructors, setInstructors] = useState(props.instructors);
  const removeInstructors = (idx) => {
    props.setInstructors([
      ...props.instructors.filter((_, index) => index !== idx)
    ]);
  };
  const addInstructors = (event) => {
    if (
      validateEmail(event.target.value) &&
      !props.instructors.includes(event.target.value)
    ) {
      props.setInstructors([...props.instructors, event.target.value]);
      event.target.value = '';
    }
  };
  return (
    <div className='mb-3'>
      <Form.Control
        type='text'
        placeholder='Enter instructor emails'
        name='instructors'
        onKeyUp={(event) =>
          event.key === 'Enter' ? addInstructors(event) : null
        }
      />
      <ul className='instructors'>
        {props.instructors.map((instructor, index) => (
          <li key={index} className='instructor'>
            <span className='instructor-title'>{instructor}</span>
            <span
              className='instructor-close-icon'
              onClick={() => removeInstructors(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassModifier;
