import React from 'react'
import { ADMIN_BRAND_LIST, offset, limit, authHeader, ADMIN_BRAND_STATUS } from '../../../../config'
import {
  CAvatar,
  CButton,
  CModal,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CModalFooter,
  CModalHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CModalTitle,
  CModalBody,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CCardHeader, CFormLabel, CFormInput } from '@coreui/react';
import { CFormTextarea } from '@coreui/react';


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
} from '@coreui/icons'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react';
import axios from 'axios';


const Brand = () => {
  const [showModal, setShowModal] = useState(false);
  const [ModalHeading, setModalHeading] = useState("AddModal");
  const [brandList, setBrandList] = useState([]);
  const [totalRecord, settotalRecord] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of items per page

  const totalPages = Math.ceil(totalRecord / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = brandList.slice(startIndex, endIndex);

  const [data, setData] = useState({
    id:'',
    name: "",
    description: ""
  });
  useEffect(() => {
    getBrandList();
  }, []);
  const getBrandList = async () => {
    try {
      const response = await axios.post(
        ADMIN_BRAND_LIST,
        {
          offset: offset,
          limit: limit
        },
        { headers: authHeader() }
      );
      if (response.data.status == true) {
        setBrandList(response.data.data); // Adjust this according to your response structure
        settotalRecord(response.data.total_record);
      }
    } catch (error) {
      console.error('Error fetching brand list:', error);
    }
  };

  const tableExample = brandList.map((brand) => ({
    id: brand.id,
    name:brand.fullName,
    statusValue: brand.status == 1 ? 2 : 1,
    avatar: { src: brand.brandImage, status: brand.status == '1' ? 'success' : 'danger' }, // Assuming avatarSrc and status are properties in your brand object
    user: {
      name: brand.fullName,
    },
    description: brand.description,
    status: brand.status == 1 ? 'success' : 'danger',
    actionName: brand.status == 1 ? 'Active' : 'Inactive'
  }));

  const handleToggle = async (id, status) => {
    try {
      const response = await axios.post(ADMIN_BRAND_STATUS, {
        id: id,
        status: status,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      });
      var result = response.data;
      if (result.status == true) {
        getBrandList();
        toast.success(result.message)
      }
    } catch (error) {
      toast.error('Error updating brand status:', error);
    }
  };

  const handleNewRecord = async (req, res) => {
    setModalHeading("Add Brand");
    setData({
      id:'',
      name:'',
      description:""
    })
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hakdkeEdutModal = async (item) => {
    setModalHeading("Edit Brand");
    setData({
      id: item.id,
      name: item.name ?? '',
      description: item.description ?? ''
    });
    setShowModal(true);
  }
    return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">

            <CCardBody>
              <div className="d-flex justify-content-end mb-4">
                <CButton
                  color="primary"
                  size="sm"
                  onClick={handleNewRecord} >New Record</CButton>
              </div>
              <CModal
                backdrop="static"
                alignment="center"
                visible={showModal}
                onClose={() => handleCloseModal()}
                aria-labelledby="StaticBackdropExampleLabel"
              >
                <CModalHeader>
                  <CModalTitle id="StaticBackdropExampleLabel">{ModalHeading}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm>
                    <div className="input-group">
                    <CFormInput
                    type="hidden"
                    id="id"
                    onChange={(e) => {
                      setData({
                        ...data,
                        id: e.target.value
                       })
                      }}
                      value={ data.id }
                      placeholder="Enter name"/>


                    <CFormInput
                    type="text"
                    id="name"
                    onChange={(e) => {
                      setData({
                        ...data,
                        name: e.target.value
                       })
                      }}
                      value={ data.name }
                      placeholder="Enter name"/>

                    </div>
                    <div className="input-group mt-3">
                      <CFormTextarea
                      value={data.description}
                      onChange={(e) => {
                        setData({
                          ...data,
                          description: e.target.value
                         })
                        }}

                        id="description"
                        placeholder="Enter description"
                      />
                    </div>
                  </CForm>
                </CModalBody>

                <CModalFooter>
                  <CButton color="secondary" onClick={() => handleCloseModal()}>
                    Close
                  </CButton>
                  <CButton color="primary">Save changes</CButton>
                </CModalFooter>
              </CModal>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Brand Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Description</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (

                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ wordWrap: 'break-word' }}>
                        <div>{item.description ?? '-'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-white">
                        <CButton
                          className="shadow"
                          style={{ color: 'white' }}
                          color={item.status}
                          onClick={() => handleToggle(item.id, item.statusValue)}
                        >
                          {item.actionName}
                        </CButton>


                        <CButton
                        title='Edit'
                          className="shadow"
                          style={{ color: 'white' }}
                          color='primary'
                          onClick={() => hakdkeEdutModal(item)}
                        >
                          Edit
                        </CButton>

                      </CTableDataCell>
                    </CTableRow>
                  ))}

                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>


        </CCol>
      </CRow>
    </>
  )
}

export default Brand
