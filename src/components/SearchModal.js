import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SearchBox from "./partials/SearchBox";
import { ReactComponent as SearchIcon } from "../assets/svgs/searchnew.svg";

function SearchModal({ openSearchModal, setOpenSearchModal }) {
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <Modal
                show={openSearchModal}
                onHide={() => setOpenSearchModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Search Product </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="search-products">
                        <SearchIcon />
                        <input
                            maxLength={60}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="search"
                            placeholder="Search your items...."
                        />
                        <SearchBox
                            searchOpen={true}
                            searchText={searchText}
                            mobile
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {" "}
                    <div style={{ fontSize: "0.8rem" }}>
                        Results for "{searchText}"
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SearchModal;
