// ** Third Party Components
import Cleave from 'cleave.js/react';
import useMessage from '../../../../lib/useMessage';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Check, X } from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText
} from 'reactstrap';

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png';
import amexCC from '@src/assets/images/icons/payments/amex-cc.png';
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png';
import visaCC from '@src/assets/images/icons/payments/visa-cc.png';
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png';
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png';
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png';
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png';

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
};

import { checkoutMembership } from '../../store';
import { validateMembership } from '../../../../utility/Utils';

import { addPaymentMethodAction, getClientContacts } from '../../store';

const CardPayment = (props) => {
  const { client, total, membershipDetail, dispatch, setIsPaid, isPaid } = props;
  const [status, setStatus] = useState(false);
  const [cardType, setCardType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isloading, setLoadingStatus] = useState(false);

  const [card, setCard] = useState({
    _id: '',
    cardType: '',
    isPrimary: false,
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [state, setState] = useState({
    holderName: '',
    cardNumber: 0,
    expiryDate: '',
    cvv: ''
  });

  let paymentMethods = client ? client.paymentMethods : [];

  const { error, success } = useMessage();

  useEffect(() => {
    const existPaymentMethod = paymentMethods.filter((item) => item.cardNumber === paymentMethod);
    if (existPaymentMethod.length > 0) {
      setPaymentMethod(existPaymentMethod[0].cardNumber);
    } else {
      if (paymentMethods.length > 0) {
        setPaymentMethod(paymentMethods[0].cardNumber);
      } else {
        setPaymentMethod('card');
      }
    }
  }, [paymentMethods]);

  function detectCardType(number) {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };
    for (var key in re) {
      if (re[key].test(number)) {
        return key;
      }
    }
    return 'unknown';
  }

  const checkoutProductByCard = (card, client, total) => {
    const data = {
      type: 'card',
      holderName: card.cardHolder,
      cardNumber: card.cardNumber,
      expiryDate: card.expiryDate,
      cvv: card.cvv,
      contact: client._id,
      membership: membershipDetail,
      total: total,
      email: client.email,
      name: client.fullName
    };
    dispatch(checkoutMembership(data)).then((res, err) => {
      setLoadingStatus(false);
      if (res && res.payload) {
        const result = res.payload.data;
        if (result.status === 'success') {
          setIsPaid(true);
          setStatus(true);
          success('payment successfully done.');
        } else {
          const msg = result.msg;
          error(msg);
        }
      }
    });
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cardInput: ''
    }
  });

  const onSubmit = (data) => {
    if (data.cardInput.length <= 0) {
      setError('cardInput', {
        type: 'manual',
        message: 'Please Enter Valid Card Number'
      });
    }
  };

  const submitHandler = () => {
    if (isPaid) {
      return;
    }
    if (client == null) {
      error('contact address must not be empty!');
      return;
    }
    const err = validateMembership(membershipDetail);
    if (Object.keys(err).length) {
      error('membership info mush be correct.');
      return;
    } else {
      if (paymentMethod !== 'card') {
        const selected_paymentCard = paymentMethods.filter(
          (method) => method.cardNumber === paymentMethod
        );
        if (selected_paymentCard.length > 0) {
          const card = selected_paymentCard[0];
          setLoadingStatus(true);
          checkoutProductByCard(card, client, total);
        }
      } else {
        if (client === '') {
          error('contact address must not be empty!');
          return;
        }
        if (card.cardHolder === '') {
          error('holder name must not be empty!');
          return;
        }
        if (card.cardNumber === 0) {
          error('card number must not be empty!');
          return;
        }
        if (card.expiryDate === '') {
          error('expiry date must not be empty!');
          return;
        }
        if (card.cvv === '') {
          error('cvv must not be empty!');
          return;
        }
        setLoadingStatus(true);

        dispatch(
          addPaymentMethodAction({
            ...card,
            clientId: client._id
          })
        ).then((res) => {
          if (res.error) {
            setLoadingStatus(false);

            // show alert
            setError('Add Payment Method', {
              type: 'manual',
              message: 'Something went wrong'
            });
          } else {
            setPaymentMethod(card.cardNumber);
            dispatch(getClientContacts());
            checkoutProductByCard(card, client, total);
            setCard({
              _id: '',
              cardType: '',
              isPrimary: false,
              cardHolder: '',
              cardNumber: '',
              expiryDate: '',
              cvv: ''
            });
          }
        });
      }
    }
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Select payment method</CardTitle>
        </CardHeader>
        <CardBody className="my-1 py-25">
          <Row className="gx-4">
            <Col>
              <Row tag={Form} className="gx-2 gy-1" onSubmit={handleSubmit(onSubmit)}>
                <Col xs={12}>
                  {paymentMethods.map((item, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <Input
                          className="me-2"
                          type="radio"
                          value={item.cardType}
                          id={`paypal-radio-${index}`}
                          name="payment-method-radio"
                          checked={paymentMethod === item.cardNumber}
                          onChange={() => setPaymentMethod(item.cardNumber)}
                        />
                        <img height="24" alt="card-type" src={cardsObj[item.cardType]} />
                        <Label className="form-check-label" for={`paypal-radio-${index}`}>
                          <span className="card-number ">
                            **** **** **** {item.cardNumber.substring(item.cardNumber.length - 4)}
                          </span>
                        </Label>
                        <span className="offset-4">CVV {item.cvv}</span>
                        <hr />
                      </div>
                    );
                  })}
                  <div className="form-check mb-1">
                    <Input
                      className="me-2"
                      type="radio"
                      value="card"
                      id="card-radio"
                      name="payment-method-radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <Label className="form-check-label" for="card-radio">
                      Add Card
                    </Label>
                  </div>
                </Col>
                {paymentMethod === 'card' && (
                  <Fragment>
                    <Row
                      tag={Form}
                      className="gy-1 gx-2 mt-75"
                      // onSubmit={handleSubmit(onSubmit)}
                    >
                      <Col xs={12}>
                        <Label className="form-label" for="credit-card">
                          Card Number
                        </Label>
                        <InputGroup className="input-group-merge">
                          <Input
                            id="credit-card"
                            placeholder="1356 3215 6548 7898"
                            value={card.cardNumber}
                            onChange={(e) => {
                              setCardType(String(detectCardType(parseInt(e.target.value))));
                              setCard((p) => ({
                                ...p,
                                cardNumber: e.target.value,
                                cardType: String(detectCardType(parseInt(e.target.value)))
                              }));
                            }}
                          />
                          {cardType !== '' && cardType !== 'unknown' ? (
                            <InputGroupText className="cursor-pointer">
                              <img height="24" alt="card-type" src={cardsObj[cardType]} />
                            </InputGroupText>
                          ) : null}
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label className="form-label" for="card-name">
                          Name On Card
                        </Label>
                        <Input
                          value={card.cardHolder}
                          onChange={(e) => {
                            setCard((p) => ({
                              ...p,
                              cardHolder: e.target.value
                            }));
                          }}
                          id="card-name"
                          placeholder="John Doe"
                          // defaultValue={selectedCondition ? selected.name : ''}
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <Label className="form-label" for="exp-date">
                          Exp. Date
                        </Label>
                        <Cleave
                          id="exp-date"
                          placeholder="MM/YY"
                          className="form-control"
                          options={{ delimiter: '/', blocks: [2, 2] }}
                          value={card.expiryDate}
                          onChange={(e) => {
                            setCard((p) => ({
                              ...p,
                              expiryDate: e.target.value
                            }));
                          }}
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <Label className="form-label" for="cvv">
                          CVV
                        </Label>
                        <Cleave
                          id="cvv"
                          placeholder="654"
                          className="form-control"
                          options={{ blocks: [3] }}
                          value={card.cvv}
                          onChange={(e) => {
                            setCard((p) => ({
                              ...p,
                              cvv: e.target.value
                            }));
                          }}
                        />
                      </Col>
                      <Col xs={12}>
                        <div className="d-flex align-items-center">
                          <div className="form-switch w-100">
                            <Input defaultChecked type="switch" name="save-card" id="save-card" />
                            <Label className="form-check-label" for="save-card">
                              <span className="switch-icon-left">
                                <Check
                                  onChange={(e) =>
                                    setCard((p) => ({
                                      ...p,
                                      isPrimary: e
                                    }))
                                  }
                                  size={14}
                                />
                              </span>
                              <span className="switch-icon-right">
                                <X size={14} />
                              </span>
                            </Label>
                            <Label className="fw-bolder ms-1" for="save-card">
                              Save Card for future billing?
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Fragment>
                )}
                <div className=" row justify-content-center">
                  <Col className="d-grid" sm="4">
                    <Button
                      color={isPaid ? 'success' : 'primary'}
                      disabled={isloading}
                      onClick={submitHandler}
                    >
                      {isloading ? 'Processing...' : isPaid ? 'Paid' : 'Pay Now'}
                    </Button>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardPayment;
