import React, { use } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2 } from "lucide-react";

const CompaniesTable = () => {

  // get companies from store; default to empty array to avoid runtime errors
  const { companies, searchCompanyByText } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany]=useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true;
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) || false;

    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div>
      <Table>
        <TableCaption>List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Companies not found</TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || "https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg"} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt ? company.createdAt.split("T")[0] : "-"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    );
};

export default CompaniesTable;



