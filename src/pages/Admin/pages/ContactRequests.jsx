import React from "react";
import { useEffect } from "react";
import { deleteContactRequest, getContactRequests } from "../api";

function ContactRequests() {
  const [contactRequests, setContactRequests] = React.useState(null);
  useEffect(() => {
    getContactRequests().then((response) => {
      console.log(response);
      setContactRequests(response.contactRequests);
    });
  }, []);

  return (
    <>
      <div className="w-full flex items-start justify-start p-5 flex-col">
        <div className="text-2xl text-center text-primary font-bold ">
          Contact Requests
        </div>
        <div className="flex flex-col w-full">
          {contactRequests !== null && contactRequests.length > 0 ? (
            contactRequests.map((result) => {
              return (
                <div
                  key={result._id}
                  className="flex flex-row justify-between border  border-primary rounded-lg my-2"
                >
                  <div className="flex flex-col justify-center gap-2 my-2 bg-white w-full  text-primary  transition duration-75 p-5">
                    <div>
                      <div className="text-xl font-bold">
                        Name:{result.name}
                      </div>
                      <div className="text-lg">
                        Email:{result.email ? result.email : null}
                      </div>
                      <div className="text-lg">
                        Phone:{result.phone ? result.phone : null}
                      </div>
                      <div className="text-lg">
                        Message:{result.message ? result.message : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end p-2 cursor-pointer">
                      <div
                        className="font-bold"
                        onClick={() => {
                          deleteContactRequest(result._id).then((response) => {
                            console.log(response);
                            getContactRequests().then((response) => {
                              console.log(response);
                              setContactRequests(response.contactRequests);
                            });
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 border border-primary rounded-md text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-2xl text-center text-primary font-bold ">
              No Contact Requests
            </div>
          )}
        </div>
      </div>
      {}
    </>
  );
}

export default ContactRequests;
