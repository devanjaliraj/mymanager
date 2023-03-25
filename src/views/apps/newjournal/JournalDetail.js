import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Input, Row } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';

import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import HtmlParser from 'react-html-parser';
import moment from 'moment';
import {
  createMyJournalById,
  getOneJournalListById
} from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';

export default function JournalDetail({
  statusOpen,
  setStatusOpen,
  viewDetailsId,
  setSideBarUpdateData,
  detailsSelectedItem
}) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [Upload, setUpload] = useState([]);
  const [journaldata, setJournaldata] = useState({});
  const [desc, setdesc] = useState('');
  console.log(journaldata);
  const handleSubmit = () => {
    const title = localStorage.getItem('jounaltitle');
    const datas = new FormData();
    datas.append('date', new Date());
    datas.append('type', 'Notes');
    datas.append('title', title);
    datas.append('desc', desc);
    datas.append('file', Upload);
    datas.append('journal_category', localStorage.getItem('journalId'));
    createMyJournalById(datas).then((response) => {
      setSideBarUpdateData(true);
      seteditorState('');
      setUpload([]);
    });
  };

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
    setdesc(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const detailPageView = () => {
    async function fetchData() {
      await getOneJournalListById(viewDetailsId ? viewDetailsId : detailsSelectedItem?._id).then(
        (response) => {
          setJournaldata(response);
          setStatusOpen('open');
        }
      );
    }
    fetchData();
  };

  useEffect(() => {
    detailPageView();
  }, [viewDetailsId ? viewDetailsId : detailsSelectedItem]);
  return (
    <div>
      <div className="detail-m">
        <p className="mm-1">
          <span className="right-side">
            {statusOpen === 'open' ? (
              <AiOutlinePlusSquare
                style={{ cursor: 'pointer' }}
                size={25}
                onClick={() => {
                  setStatusOpen('close');
                }}
                className="categorybtntext mb-2"
              ></AiOutlinePlusSquare>
            ) : (
              <AiOutlineCloseCircle
                style={{ cursor: 'pointer' }}
                size={25}
                onClick={() => {
                  setStatusOpen('open');
                }}
              ></AiOutlineCloseCircle>
            )}
          </span>
        </p>
        {statusOpen === 'open' ? (
          <>
            {moment(journaldata?.date).format('Y-MMM-D')}
            <div className="detail-view">
              <Container>
                <Row>
                  <Col md="12" className="mt-1">
                    <img src={journaldata?.jrnl_img} className="" alt="jrnl_img" width="100%" />
                    <h4>{journaldata?.title}</h4>
                  </Col>
                  <Col md="12" className="mt-1 mb-2">
                    <p>{HtmlParser(journaldata?.desc)}</p>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        ) : (
          <>
            <div className="detail-1 mt-2">
              <Container>
                <Form>
                  <Row>
                    <Col md="12" className="mt-1 mb-1">
                      <Input
                        onChange={(e) => setUpload(e.target.files[0])}
                        type="file"
                        className="form-control"
                        name="file"
                      />
                    </Col>
                    <Col md="12">
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          options: ['inline', 'textAlign'],
                          inline: {
                            inDropdown: false,
                            options: ['bold', 'italic', 'underline', 'strikethrough']
                          }
                        }}
                      />
                    </Col>
                    <Col md="12">
                      <div className="btn-st-r">
                        <Button color="primary" outline onClick={handleSubmit}>
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
