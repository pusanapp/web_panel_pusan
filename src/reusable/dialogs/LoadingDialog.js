import React from "react";
import {CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle} from "@coreui/react";

const LoadingDialog = ({show}) => {
  console.log(show)
  return (
    <CModal
      show={show}
      size="sm"
      onClose={()=>{}}
      closeOnBackdrop={false}
    >
      <CModalHeader >
        <CModalTitle>Loading</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-center mt-2">
              <div
                className="spinner-border text-primary"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <span className="sr-only">Loading...</span>
              </div>

            </div>
            <div className="mt-3">
              <p className="text-muted text-center font-size-h3 font-weight-bold">
                Please Wait ...
              </p>
            </div>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}
export default LoadingDialog
