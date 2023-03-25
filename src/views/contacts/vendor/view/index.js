// ** React Imports
import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// Import actions
import { getSingleConactAction } from '../store/actions'

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import Connections from './Connections'
import LeadInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
    // ** Store Vars
    const store = useSelector((state) => state.vendorContact);
    console.log(store)

    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    const { singleContact } = useSelector((state) => state.vendorContact)
  
    // ** Hooks
    const { id } = useParams()


    useMemo(() => {
        if (singleContact?.data) {
            setUser(singleContact?.data)
        }

        if (id) {
          if (store?.singleClient?.client) {
            setUser(store?.singleClient?.client);
          } else {
            let vendorData = store?.contacts?.list?.find((x) => String(x._id) === String(id));
            if (vendorData) {
                setUser(vendorData);
            }
          }
        }
      }, [id, history, store, singleContact]);

    // ** Get suer on mount
    useEffect(() => {
        dispatch(getSingleConactAction(id))
    }, [dispatch, id])

    const [active, setActive] = useState('1')

    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return user !== null && user !== undefined ? (
        <div className="app-user-view">
            <Row>
                <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                    <LeadInfoCard selectedUser={user} notes={store?.vendorNote} />
                    {/* <Connections selectedUser={user} /> */}
                </Col>
                <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                    <UserTabs
                        active={active}
                        toggleTab={toggleTab}
                        selectedUser={user}
                    />
                </Col>
            </Row>
        </div>
    ) : singleContact?.loading ? (
        <Spinner />
    ) : (
        <Alert color="danger">
            <h4 className="alert-heading">Lead not found</h4>
            <div className="alert-body">
                Lead with id: {id} doesn't exist. Check list of all Users:{' '}
                <Link to="/apps/user/list">Users List</Link>
            </div>
        </Alert>
    )
}
export default UserView
