import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { BiMenu, BiX } from "react-icons/bi";
import {
  Container,
  Flex,
  Box,
  Text,
  useBreakpointValue,
  IconButton,
  HStack,
  VStack,
  StackDivider,
  Progress,
} from "@chakra-ui/react";

import Logo from "components/Logo";
import SocialLinkBar from "components/SocialLinkBar";

import useToken from "hooks/use-token";

import { OurStore } from "rdx/store";
import { reset } from "rdx/slices/auth";
import { Status } from "rdx/types";

const tabs = [
  {
    id: 0,
    name: "Feed",
    path: "/feed",
  },
  {
    id: 1,
    name: "Village",
    path: "/village",
  },
  {
    id: 2,
    name: "Graduates",
    path: "/graduates",
  },
];

const Header = () => {
  const router = useRouter();
  const { pathname, query:{id} } = router;

  const dispatch = useDispatch();
  const {status } = useSelector((state: OurStore) => state.authReducer);

  const village = id
  
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const [activeTab, setActiveTab] = useState(
    pathname === "/feed"
      ? tabs[0]
      : pathname.includes("village")
      ? tabs[1]
      : pathname.includes("graduates")
      ? tabs[2]
      : null
  );

  const {removeToken} = useToken();

  const logout = () => {
    dispatch(reset());
    removeToken();
    router.push("/");
  };

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Box bg="white" pos="sticky" top={0} zIndex={10} shadow="md">
          <Container maxW="container.xl" px={6}>
            <Flex justifyContent="space-between">
              <HStack spacing={6} mr={1}>
                <Logo />
                {tabs.map((tab) => (
                  <Link key={tab.name} href={tab.path === "/village" ? `${tab.path}/${village}` : tab.path}>
                    <Flex
                      h="55px"
                      alignItems="center"
                      fontSize="14px"
                      borderBottom={activeTab?.name === tab.name ? "2px" : ""}
                      borderColor={
                        activeTab?.name === tab.name ? "purpleTone" : ""
                      }
                      color={
                        activeTab?.name === tab.name ? "purpleTone" : "GrayText"
                      }
                      cursor="pointer"
                    >
                      {tab.name}
                    </Flex>
                  </Link>
                ))}
              </HStack>
              <HStack spacing={6} ml={1}>
                <Flex
                  h="full"
                  alignItems="center"
                  fontSize="12px"
                  borderBottom={pathname.includes("accountedit") ? "2px" : ""}
                  borderColor={
                    pathname.includes("accountedit") ? "purpleTone" : ""
                  }
                >
                  <Link href="/accountedit">
                    <Text mt={1} cursor="pointer">
                      ACCOUNT
                    </Text>
                  </Link>
                </Flex>
                <Box
                  px={4}
                  h="24px"
                  textAlign="center"
                  color="purpleTone"
                  fontSize="12px"
                  border="1px"
                  borderColor="purpleTone"
                  borderRadius="6px"
                  cursor="pointer"
                  onClick={() => logout()}
                >
                  <Text>LOGOUT</Text>
                </Box>
              </HStack>
            </Flex>
          </Container>

          {status === Status.LOADING && (
            <Box w="full">
              <Progress h="2px" size="xs" isIndeterminate />
            </Box>
          )}
        </Box>
      )}

      {breakpointValue === "base" && (
        <Box>
          <Flex
            pos="fixed"
            top={0}
            zIndex={20}
            w="full"
            h="55px"
            justifyContent="right"
            alignItems="center"
            px={6}
          >
            {/* <Logo /> */}
            <IconButton
              aria-label=""
              icon={showMenuMobile ? <BiX /> : <BiMenu />}
              fontSize="26px"
              onClick={() => setShowMenuMobile(!showMenuMobile)}
            />
          </Flex>

          {showMenuMobile && (
            <Box
              pos="fixed"
              top={0}
              left={0}
              w="full"
              h="100vh"
              bgColor="white"
              zIndex="10"
            >
              <VStack divider={<StackDivider />} mt={8}>
                {tabs
                  .concat([
                    {
                      id: 3,
                      name: "Account",
                      path: "/accountedit",
                    },
                    {
                      id: 4,
                      name: "Logout",
                      path: "/signout",
                    },
                  ])
                  .map((tab) => (
                    <Flex
                      key={tab.name}
                      h="55px"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Link href={tab.path === "/village" ? `${tab.path}/${village}` : tab.path}>{tab.name}</Link>
                    </Flex>
                  ))}
              </VStack>

              <Box mt={16}>
                <SocialLinkBar />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Header;
