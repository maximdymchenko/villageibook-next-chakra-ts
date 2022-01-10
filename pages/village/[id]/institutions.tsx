import { Fragment, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import InstitutionCard from "components/InstitutionCard";
import Alert from "components/widgets/Alert";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Paginate from "components/Paginate";

const Institutions: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = useWindowProp();

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { village, villageInstitutions } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
  
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#553cfb");
  const [pageData, setPageData] = useState(null);
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);

  if (villageInstitutions && villageInstitutions.length > 0 && loading) {
    setLoading(false);
    setItemOffset(0);
  }

  const handlePageClicked = event => {
    const newOffset = (event.selected * itemsPerPage) % villageInstitutions.length;
    setItemOffset(newOffset);
  };
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageData(villageInstitutions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(villageInstitutions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Institutions" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
            </Box>
          )}

          { !loading ?
            <Box
              w="full"
              ml={
                fixed && breakpointValue === "md"
                  ? "264px"
                  : breakpointValue === "md"
                    ? "24px"
                    : "0px"
              }
            >
              <VStack spacing={2}>
                {pageData?.length > 0 &&
                  pageData.map((institution) => (
                    <InstitutionCard
                      key={institution.id}
                      institution={institution}
                    />
                  ))}
                {pageData?.length == 0 && (
                  <Alert message="There is no institution to be displayed." />
                )}
              </VStack>
              <Paginate 
                handlePageClick={handlePageClicked}
                pageCount={pageCount}
              />
            </Box> :
          <ScaleLoader color={color} loading={loading} css={override} /> }
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Institutions;
