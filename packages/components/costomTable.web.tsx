import React from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  TableContainer
} from "@material-ui/core";
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox.web';
import { EditIcon, DeleteIcon, CheckIcon, profileIcon, OptionIcon } from './assets';
import CustomTypography from '../CustomTypography/CustomTypography.web';



const CustomTable = (props: any) => {
  const TableWidth = 100 / props.headers.length;

  const functionCss = (header: any): any => {
    const ImageStyles: any = {
      ...imgStyle[header.img_variant ? header.img_variant : 'circular_img'],
    };
    const TableCellBlock: any = {
      ...tablecellstyle[header.blockCss ? header.blockCss : ''],
    };
    const Table: any = {
      ...tablecellstyle[header.TableName ? header.TableName : "AllTable"],
    };
    return { ImageStyles, TableCellBlock, Table };
  };

  const ImgFunction = (header: any): any => {
    const ImgSource: any = imgSrc[header.imgsrc ? header.imgsrc : '']
    return ImgSource;
  }

  const renderAvatarColumn = (header: any, data: any): any => (
    <span style={webStyles.TableFlexBlock}>
      <img
        src={data.attributes[ImgFunction(header)] || profileIcon}
        alt={data.attributes.name}
        style={functionCss(header).ImageStyles}
      />
      {header.id === "ItemList" ? " " : header.id === "Customer" ? (
        <Box style={webStyles.ImgContent}>
          <CustomTypography component="body11">{data.attributes[header.id]}</CustomTypography>
          <CustomTypography component="emailText">{data.attributes.email}</CustomTypography>
        </Box>
      ) : (
        <span style={webStyles.ImgContent}>
          {data.attributes[header.id]}
        </span>
      )}
    </span>
  );
  return (
    <Box>
      <TableBox>
        <TableContainer data-test-id="tableData">
          <Table>
            <TableHead>
              <TableRow style={webStyles.tableheadRow}>
                {props.headers.map((header: any, index: any) => (
                  <TableCell key={header.id}>{index === 0 && <CustomCheckBox icon={<img src={CheckIcon} alt="check Arrow" style={webStyles.check} />} />}{header.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((data: any, ind: any) => (
                <TableRow key={data.id} style={webStyles.tableBody} >
                  {props.headers.map((header: any, index: any) => (
                    <TableCell
                      key={header.id}
                      style={{
                        ...functionCss(header).TableCellBlock,
                        ...functionCss(header).Table,
                        width: header.columnWidth === 'auto' ? 'auto' : `${TableWidth}%`
                      }}
                    >
                      {index === 0 ? (
                        <span style={webStyles.TableFlexBlock}>
                          <CustomCheckBox icon={<img src={CheckIcon} alt="check Arrow" style={webStyles.check} />} />
                          {header.type === "avatar" && renderAvatarColumn(header, data)}
                        </span>
                      ) : (
                        <span>
                          {header.type === "avatar" ? renderAvatarColumn(header, data) : (
                            header.type === "actions" ? (
                              <Box style={webStyles.TableFlexBlock}>
                                <span style={webStyles.ActionIconBlock}>
                                  <img src={EditIcon} style={webStyles.ActionIcon} />
                                </span>
                                <span
                                  style={webStyles.ActionIconBlock}
                                  data-test-id={`delete_icon-${ind}`}
                                  onClick={() => props.handleDelete(data.id)}
                                >
                                  <img src={DeleteIcon} style={webStyles.ActionIcon} />
                                </span>
                              </Box>
                            ) : header.type === "status" ? (
                              <Box style={{ ...webStyles.badge, ...(data.attributes[header.id] === "PAID" ? webStyles.paidColor : webStyles.RejectColor) }}>
                                <span style={{ ...webStyles.Dot, ...(data.attributes[header.id] === "PAID" ? webStyles.paidDot : webStyles.RejectdotColor) }}></span>
                                <CustomTypography>{data.attributes[header.id]}</CustomTypography>
                              </Box>
                            ) : (
                              <span>{data.attributes[header.id]}</span>
                            )
                          )}
                        </span>
                      )}
                      {header.type === "action_icon" && index === props.headers.length - 1 && (
                        <span style={webStyles.ActionIconBlock}>
                          <img src={OptionIcon} style={webStyles.ActionIcon} />
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableBox>
    </Box>
  );
};

const webStyles = {
  tableheadRow: {
    backgroundColor: "#E7EBEB",
    border: "none",
    color: "#000",
    fontWeight: 500,
    fontFamily: "Outfit",
    height: "60px"
  },
  tableBody: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#000",
    fontFamily: "Outfit",
  },
  TableFlexBlock: {
    display: "flex",
    alignItems: "center"
  },
  ProfileIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  },
  ActionIconBlock: {
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7EBEB",
    border: "none",
    marginRight: "16px"
  },

  ActionIcon: {
    width: "20px",
    height: "20px"
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    paddingRight: "18px"
  },
  check: {
    margin: "0px 10px"
  },
  badge: {
    fontFamily: "Outfit",
    fontSize: "12px",
    fontWeight: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    height: "32px"
  },
  Dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  paidColor: {
    background: "rgba(5, 150, 105, 0.26)",
    color: "#057A55",
    width: "80px"
  },
  paidDot: {
    background: "#057A55"
  },
  RejectdotColor: {
    background: "#DC2626",
  },
  RejectColor: {
    background: "rgba(220, 38, 38, 0.20)",
    color: "#DC2626",
    width: "120px"
  },
  ImgContent: {
    marginLeft: "8px"
  }
};

const imgStyle: any = {
  squareImg: {
    width: "49px",
    height: "49px"
  },
  circularImg: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    marginLeft: "8px"
  }
}
const tablecellstyle: any = {
  EmailBlock: {
    color: "#73767A"
  },
  OptionIcon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  OrderTable: {
    height: "80px",
    maxHeight: "80px",
    minHeight: "80px"
  },
  AllTable: {
    height: "60px",
    maxHeight: "60px",
    minHeight: "60px"
  },
}

const imgSrc: any = {
  ProfileImg: "profile_images.url",
  CustomerImg: "Customer_img",
  ItemListImg: "ItemList",
}



const TableBox = styled(Box)({
  "& .MuiTableContainer-root": {
    overflow: "auto"
  },
  "& .MuiTableCell-root": {
    padding: "0px",
    fontSize: "16px",
  },
  "& .MuiTableCell-head": {
    fontWeight: 600,
    '@media (max-width: 991px)': {
      minWidth: "180px",
    },
  },
  "& ..MuiIconButton-root": {
    padding: "0px"
  },
  "& .MuiIconButton-colorSecondary:hover": {
    backgroundColor: "transparent"
  },
  "& .MuiIconButton-root:hover": {
    backgroundColor: "transparent"
  },
  "& .MuiCheckbox-colorSecondary.Mui-checked": {
    color: "rgba(0, 0, 0, 0.54)"
  },
});
export default CustomTable;
