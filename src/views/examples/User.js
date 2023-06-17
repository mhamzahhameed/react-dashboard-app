/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    InputGroup, InputGroupAddon, Input, Col, InputGroupText, FormGroup
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
  
  const User = () => {
    const [title,setTitle] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');
   
  useEffect(()=>{
    
   
    fetchData()
  
  },[searchValue])
 const fetchData = async()=>
 {
    try {
        const response = await axios.get(
          `https://dummyjson.com/products`
        );
        response.data.products[0] = {...response.data.products[0],Action: ""}
        setTitle(Object.keys(response.data.products[0]))
        const fetchedData = response.data.products;
        const filteredData = searchValue
        ? fetchedData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
        : fetchedData;
    
      setData(filteredData);
      console.log(filteredData)
      } catch (error) {
        console.error(error);
      }
 }
    // Function to calculate the current page's records
    const getCurrentPageData = () => {
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      return data.slice(startIndex, endIndex);
    };
  
    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Function to handle previous page
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Function to handle next page
    const goToNextPage = () => {
      const totalPages = Math.ceil(data.length / perPage);
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    // Render the current page's records
    const renderData = () => {
      const currentPageData = getCurrentPageData();
        
      return currentPageData.map((item) => (
        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.discountPercentage}</td>
                            <td>{item.rating}</td>
                            <td>{item.stock}</td>
                            <td>{item.brand}</td>
                            <td>{item.category}</td>
                            <td><Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={item.thumbnail}
                              height={100}
                              width={100}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                            {item.title}
                            </span>
                          </Media>
                        </Media></td>
                            <td><div className="avatar-group">
                           {item.images.map((el,keys)=>{
                            return  <img
                            alt="..."
                            className="rounded-circle"
                            height={100}
                            width={100}

                            src={el}
                          />
                           })}
                                </div></td>
                            
                            <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                         
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                           
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                        
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                        </tr>
      ));
    };
  
    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / perPage);
    // Generate an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 ">
                  <h3 className="mb-0">Customers
          </h3>
          
          <FormGroup className="mb-0 w-50 float-right">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" onChange={(e)=> setSearchValue(e.target.value)}/>
              </InputGroup>
            </FormGroup>

        
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    
                  <tr>
                      {title.map((item,index)=>{
                        return <th scope="col">{item}</th>
                      })}
                      </tr>
                    
                  </thead>
                  <tbody>
                  {renderData()}
          
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                        
                          onClick={goToPreviousPage} 
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
      {pageNumbers.map((pageNumber)=>{
        return(
            <PaginationItem active={currentPage === pageNumber}>
        <PaginationLink
          href="#pablo"
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
        )
      })}
                   
                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                          onClick={goToNextPage} 
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Shopkeeper
          </h3>
          
          <FormGroup className="mb-0 w-50 float-right">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" onChange={(e)=> setSearchValue(e.target.value)}/>
              </InputGroup>
            </FormGroup>

        
                </CardHeader>
                <Table className="align-items-center table-dark table-flush" responsive>
                  <thead className="thead-dark">
                    
                  <tr>
                      {title.map((item,index)=>{
                        return <th scope="col">{item}</th>
                      })}
                      </tr>
                    
                  </thead>
                  <tbody>
                  {renderData()}
          
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                        
                          onClick={goToPreviousPage} 
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
      {pageNumbers.map((pageNumber)=>{
        return(
            <PaginationItem active={currentPage === pageNumber}>
        <PaginationLink
          href="#pablo"
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
        )
      })}
                   
                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                          onClick={goToNextPage} 
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          
        </Container>
      </>
    );
  };
  
  export default User;
  