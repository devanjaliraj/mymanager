import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addFormEntryAction,
  addLeadAction,
  getFormDataAction,
  updateFormEntryAction
} from '../store/action';
import { b64toBlob } from '../../documents/helpers/loadPdfHelper';
import { useUploadSignature } from '../../../requests/documents/recipient-doc';
import { Input, Modal, ModalBody } from 'reactstrap';
import { Helmet } from 'react-helmet';

export default function Preview() {
  // ** STATES
  const [surveys, setSurveys] = useState([]);

  const { id, path } = useParams();
  const store = useSelector((state) => state.formEditor);

  const dispatch = useDispatch();

  const setPayload = () => {
    var payload = {};
    const inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      switch (input.getAttribute('selectedtype')) {
        case 'fullname':
          payload = { ...payload, fullName: input.value };
          break;
        case 'email':
          payload = { ...payload, email: input.value };
          break;
        case 'phone':
          payload = { ...payload, phone: input.value };
          break;
        case 'type':
          payload = { ...payload, type: 'individual' };
          break;
        case 'birthday':
          payload = { ...payload, dob: new Date(input.value) };
          break;
        case 'street':
          payload = { ...payload, address: { ...payload.address, street: input.value } };
          break;
        case 'city':
          payload = { ...payload, address: { ...payload.address, city: input.value } };
          break;
        case 'state':
          payload = { ...payload, address: { ...payload.address, state: input.value } };
          break;
        case 'country':
          payload = { ...payload, address: { ...payload.address, country: input.value } };
          break;
        case 'zip':
          payload = { ...payload, address: { ...payload.address, zipCode: input.value } };
          break;
        case 'text':
          payload = { ...payload, note: input.value };
          break;

        default:
          switch (input.type) {
            case 'checkbox':
              payload = {
                ...payload,
                inputData: { ...payload?.inputData, [input.name]: input.checked }
              };
              break;

            default:
              break;
          }
          break;
      }
    }

    // get address section inputs
    const addressSection = document.getElementsByClassName('address-section');
    for (const address of addressSection) {
      let childrenInput = address.querySelectorAll('input');
      switch (address.getAttribute('addresstype')) {
        case 'contact':
          //contactAddress
          for (const child of childrenInput) {
            payload = {
              ...payload,
              contactAddress: { ...payload.contactAddress, [child.name]: child.value }
            };
          }
          break;
        case 'shipping':
          //shippingAddress
          for (const child of childrenInput) {
            payload = {
              ...payload,
              shippingAddress: { ...payload.shippingAddress, [child.name]: child.value }
            };
          }
          break;
        case 'billing':
          //billingAddress
          for (const child of childrenInput) {
            payload = {
              ...payload,
              billingAddress: { ...payload.billingAddress, [child.name]: child.value }
            };
          }
          break;
        default:
          for (const child of childrenInput) {
            payload = {
              ...payload,
              contactAddress: { ...payload.contactAddress, [child.name]: child.value }
            };
          }
          break;
      }
    }

    ///get selects input
    const selects = document.getElementsByTagName('select');
    for (const select of selects) {
      payload = { ...payload, inputData: { ...payload?.inputData, [select.name]: select.value } };
    }
    const textAreas = document.getElementsByTagName('textarea');
    for (const textArea of textAreas) {
      payload = {
        ...payload,
        inputData: { ...payload?.inputData, [textArea.name]: textArea.value }
      };
    }

    console.log(document.getElementById('set-survey').value);
    if (document.getElementById('set-survey').value) {
      let s = JSON.parse(document.getElementById('set-survey').value);
      payload = { ...payload, survey: s };
    }

    return payload;
  };
  const saveData = (type, payload) => {
    switch (type) {
      case 'submit':
        /// ** SAVE FORM DATA
        if (store?.form.automateEntry === true) {
          dispatch(addLeadAction(id, payload));
        }
        /// save form data

        dispatch(addFormEntryAction(id, payload)).then((data) => {
          //////----------------show success page-------------------------
          if (data?.success === true) {
            // go to submitForm
            window.location.href = `/form-funnel/submitted/${id}`;
          } else {
            toast.error('Something went wrong! Please try again!');
          }
        });
        break;
      case 'open-website':
        //redirect to url
        const url = e.currentTarget.getAttribute('url');
        const target = e.currentTarget.getAttribute('target');

        target === '_blank' ? window.open(url, target) : (window.location.href = url);
        break;
      case 'next-step':
        //go to next step on the funnel
        //get next path
        const p = store.form.formData.find((x) => x.path === path);
        const index = store.form.formData.indexOf(p);
        if (index === 0) {
          // add data
          /// ** SAVE FORM DATA
          if (store?.form.automateEntry === true) {
            dispatch(addLeadAction(id, payload));
          }
          /// save form data
          dispatch(addFormEntryAction(id, payload)).then((data) => {
            if (data?.success === true) {
              localStorage.setItem('formEntry', data.data._id);
              window.location.href = `/form-funnel/${id}&path=${
                store.form.formData[index + 1].path
              }`;
            } else {
              toast.error('Something went wrong! Please try again!');
            }
          });
        } else if (index < store.form.formData.length) {
          const entryId = localStorage.getItem('formEntry');
          if (entryId && entryId !== '') {
            /// ** SAVE FORM DATA
            if (store?.form.automateEntry === true) {
              dispatch(addLeadAction(id, payload));
            }
            // update data

            dispatch(updateFormEntryAction(entryId, payload)).then((data) => {
              if (data?.success === true) {
                window.location.href = `/form-funnel/${id}&path=${
                  store.form.formData[index + 1].path
                }`;
              } else {
                toast.error('Something went wrong! Please try again!');
              }
            });
          } else {
            toast.error('Your data is not available please start over!');
          }
        } else {
          const entryId = localStorage.getItem('formEntry');
          if (entryId && entryId !== '') {
            /// ** SAVE FORM DATA
            if (store?.form.automateEntry === true) {
              dispatch(addLeadAction(id, payload));
            }
            // update data

            dispatch(updateFormEntryAction(entryId, payload)).then((data) => {
              if (data?.success === true) {
                window.location.href = `/form-funnel/submitted/${id}`;
              } else {
                toast.error('Something went wrong! Please try again!');
              }
            });
          } else {
            toast.error('Your data is not available please start over!');
          }
        }
        break;

      default:
        break;
    }
  };
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.currentTarget.getAttribute('selectedOption');
    var payload = setPayload();

    //get signs
    const signatures = document.getElementsByClassName('signature-text');
    if (signatures.length > 0) {
      for (const canvas of signatures) {
        //upload signature
        const signaturePad = canvas;
        const base64 = signaturePad.toDataURL();
        const blob = b64toBlob(base64);
        let file = new File([blob], 'sign.png', {
          type: 'image/png'
        });
        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            let signs = [];
            if (payload.signature) {
              signs = payload.signature;
              signs = [...signs, { id: canvas.id, url: res.url }];
              payload = {
                ...payload,
                signature: signs
              };
            } else {
              signs = [{ id: canvas.id, url: res.url }];
              payload = {
                ...payload,
                signature: signs
              };
            }

            //save data
            // ** Switch on submit type
            saveData(type, payload);
          }
        });
      }
    } else {
      // ** Switch on submit type
      saveData(type, payload);
    }
  };
  const onRateClick = (e) => {
    const parent = e.target.parentNode;
    const surveyParent = parent.parentNode;

    let children = parent.childNodes;

    if (e.target.classList.contains('star-input-1')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 1 };
          }
          return x;
        });

        document.getElementById('set-survey').value = JSON.stringify(temp);
        setSurveys(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 1 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 1 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-2')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 2 };
          }
          return x;
        });
        document.getElementById('set-survey').value = JSON.stringify(temp);
        setSurveys(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 2 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 2 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-3')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 3 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 3 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 3 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-4')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 4 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 4 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 4 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-5')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = 'orange';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 5 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 4 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 5 }
        ]);
      }
    }
  };

  useEffect(() => {
    // let html = localStorage.getItem("gjs-html");
    // let css = localStorage.getItem("gjs-css");
    // let html = store.formData.html;
    // let css = store.formData.css;

    dispatch(getFormDataAction(id));
  }, []);

  useEffect(() => {
    if (store && store?.form?.formData.length > 0 && store?.form?.formData[0]?.html != '') {
      const formData = store.form.formData.find((x) => x.path === path);

      /// ** SIGNATURE DRAWING
      function resizeCanvas() {
        var ratio = 1;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
      }
      window.addEventListener('resize', resizeCanvas);
      const initLib = function () {
        let signatures = document.getElementsByClassName('signature-text');
        for (let index = 0; index < signatures.length; index++) {
          let canvas = signatures[index];
          const signaturePad = new window.SignaturePad(canvas);
          signaturePad.minWidth = 1;
          signaturePad.maxWidth = 1;
          signaturePad.penColor = 'rgb(0, 0, 0)';
          canvas.onresize = resizeCanvas;
        }
      };
      const script = document.createElement('script');
      script.onload = initLib;
      script.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js';
      document.body.appendChild(script);

      // ** END SIGNATURE DRAWING

      // ** COUNTDOWN

      // ** END COUNTDOWN

      let html = formData.html;
      let css = formData.css;
      html = html.replace('<body', '<div');
      html = html.replace('</body>', '</div>');
      html = html.replaceAll('add-new-column', 'add-new-column d-none');
      html = html.replaceAll('add-new-element', 'add-new-element d-none');

      html = html + `<style>${css}</style>`;
      html =
        html +
        `<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
      <script type="text/javascript" src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
      
      <script type="text/javascript" src="https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js"></script>
      <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
      <script>
      const canvas = document.getElementById("signature-pad");
        

        const signaturePad = new window.SignaturePad(canvas);
        signaturePad.minWidth = 1;
        signaturePad.maxWidth = 1;
        signaturePad.penColor = "rgb(0, 0, 0)";

        canvas.onresize = resizeCanvas;
        resizeCanvas()
            </script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css">
      <link rel="stylesheet" href="/assets/form-builder/grapes-form.css">
      <link rel="stylesheet" href="/assets/form-builder/themes.css">`;

      document.getElementById('editor').innerHTML = html;

      let products = document.getElementsByClassName('product');
      for (let product of products) {
        // let totalPrice = "$" + product.getAttribute('totalprice');
        // product.querySelector("[name='total_price']").innerHTML = (totalPrice);
        // product.querySelector("[name='down_payment']").innerHTML = (totalPrice);
        // product.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
      }

      let memberships = document.getElementsByClassName('membership');
      for (let membership of memberships) {
        // let totalPrice = "$" + membership.getAttribute('totalprice');
        // let registerFee = "$" + membership.getAttribute('registerfee');
        // let dPayment = "$" + membership.getAttribute('dpayment');
        //
        //
        // membership.querySelector("[name='total_price']").innerHTML = (totalPrice);
        // membership.querySelector("[name='down_payment']").innerHTML = (dPayment);
        // membership.querySelector("[name='registration_fee']").innerHTML = (registerFee);
        // membership.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
      }

      let buttons = document.getElementsByClassName('btn-submit');
      for (let button of buttons) {
        button.addEventListener('click', onClick);
      }

      // ** STAR RATING
      const allStars = document.getElementsByClassName('star-input');
      for (const star of allStars) {
        star.addEventListener('click', onRateClick);
      }

      //   let signatures = document.getElementsByClassName('signature-text')
      //   for(let canvas of signatures){
      //     const signaturePad = new SignaturePad(canvas)

      // }
    }
  }, [store.form]);
  return (
    <>
      {store && store?.form && store?.form?.seoDetails && (
        <>
          <Helmet>
            <title>{store?.form?.seoDetails?.title}</title>
            <meta name="description" content={`${store?.form?.seoDetails?.description}`} />
            <meta name="keywords" content={`${store?.form?.seoDetails?.keywords}`} />
            <link rel="icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <link rel="shortcut icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <link rel="apple-touch-icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <meta name="author" content={`${store?.form?.seoDetails?.author}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={`${store?.form?.seoDetails?.title}`} />
            <meta property="og:description" content={`${store?.form?.seoDetails?.description}`} />
            <meta property="og:image" content={`${store?.form?.seoDetails?.socialImage}`} />
            <meta property="og:url" content={`/form-funnel/${id}&path=${
                store?.form?.formData[0]?.path
              }`} />
            <meta property="og:site_name" content={`${store?.form?.seoDetails?.title}`} />

            <meta name="twitter:title" content={`${store?.form?.seoDetails?.title}`} />
            <meta name="twitter:description" content={`${store?.form?.seoDetails?.description}`} />
            <meta name="twitter:image" content={`${store?.form?.seoDetails?.socialImage}`} />
            <meta name="twitter:site" content={`/form-funnel/${id}&path=${
                store?.form?.formData[0]?.path
              }`} />
            <meta name="twitter:creator" content={`${store?.form?.seoDetails?.twitter}`} />
            {store?.form?.seoDetails?.headCode}
          </Helmet>
        </>
      )}
      <Input type="hidden" id="set-survey" />
      <div className="App" id="editor"></div>
      {store?.form?.seoDetails?.bodyCode}
      {/* <Modal>
        <ModalBody>
          <h2>Successfull!</h2>
        </ModalBody>
      </Modal> */}
    </>
  );
}
