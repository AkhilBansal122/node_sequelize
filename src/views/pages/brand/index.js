import React from 'react'
import { ADMIN_BRAND_LIST, offset, limit, authHeader, ADMIN_BRAND_STATUS } from '../../../../config'
import {
  CAvatar,
  CButton,

  CCard,
  CCardBody,
  CCol,
  CPagination,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
} from '@coreui/icons'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react';
import axios from 'axios';


const Brand = () => {

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

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <br />
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
