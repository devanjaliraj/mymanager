import React, { memo, useEffect, useState, useContext } from 'react';
import { Badge, CardText, ListGroup } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { activeTextContacts } from '../store';
import { formatDateToMonthShort } from '../../../../utility/Utils';
import { SocketContext } from '../../../../utility/context/Socket';
import { getTextContacts } from '../../../apps/text/store';

function UserChatList({ query, filteredContacts, store }) {
  const dispatch = useDispatch();
  const { contacts } = store;
  const [arrayOne, setArrayOne] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('incomingTextMessage', (data) => {
      dispatch(getTextContacts());
    });
  }, [])

  useEffect(() => {
    setArrayOne([]);
    contacts.map((item) => {
      if (item.unReadMessages === 0) {
        setArrayOne((arrayOne) => [...arrayOne, false]);
      } else {
        setArrayOne((arrayOne) => [...arrayOne, true]);
      }
    });
  }, [contacts]);


  const UserChatActivity = async (event, Info, index) => {
    dispatch(activeTextContacts(Info));
  };
  const updateArray = (id, index) => {
    setSelectedItem(id);
    const newArray = [...arrayOne];
    newArray[index] = false;
    setArrayOne(newArray);
  };
  if (contacts && contacts.length) {
    if (query.length && !filteredContacts.length) {
      return (
        <div className="no-results show">
          <h6 className="mb-0">No Chats Found</h6>
        </div>
      );
    } else {
      const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts;

      return arrToMap.map((item, index) => {
        const time = formatDateToMonthShort(item.lastMessage?.createdAt || new Date());

        return (
          <>
            <ListGroup className="m-0 p-0">
              <div
                key={item.fullName}
                className={`w-100 p-1 gap-1 d-flex align-items-center ${
                  selectedItem === item._id ? 'chatSelect' : 'chatHover'
                }`}
                onClick={(event) => {
                  UserChatActivity(event, {
                    fullName: item?.fullName,
                    email: item?.email,
                    uid: item?._id,
                    phone: item?.phone
                  });
                  updateArray(item._id, index);
                }}
              >
                {item.photo ? (
                  <Avatar img={item.photo} imgHeight="32" imgWidth="32" status="online" />
                ) : (
                  <Avatar
                    color="primary"
                    imgHeight="32"
                    imgWidth="32"
                    status="online"
                    content={item.fullName.charAt(0).toUpperCase() || 'N/A'}
                  />
                )}
                <div className="chat-info flex-grow-1 width-40-per">
                  <h5 className="mb-0">{item.fullName}</h5>
                  <CardText className="text-truncate">{item.lastMessage?.textContent}</CardText>
                </div>
                <div className="chat-meta text-nowrap d-flex flex-column">
                  <div>
                    <small
                      className={`float-end mb-25 chat-time ms-25 timeStyle ${
                        selectedItem === item._id ? 'selectedTimeColor' : ''
                      }`}
                    >
                      {time}
                    </small>
                  </div>
                  <div>
                    {arrayOne[index] === true ? (
                      <Badge className="float-end" color="success" pill>
                        {item.unReadMessages}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </ListGroup>
          </>
        );
      });
    }
  } else {
    return null;
  }
}

export default memo(UserChatList);
