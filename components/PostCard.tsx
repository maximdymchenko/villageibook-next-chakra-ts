import React, { Fragment, useState } from "react";
import Link from "next/link";
import ReactReadMoreReadLess from "react-read-more-read-less";

import {
  Flex,
  Stack,
  HStack,
  VStack,
  Box,
  Center,
  Text,
  Textarea,
  Avatar,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiChevronUp, BiChevronDown, BiCommentDots } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";

import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import { Post } from "types/data";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [extendView, setExtendView] = useState(false);
  const [comment, setComment] = useState("");

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    const limit = 120;
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  return (
    <Fragment>
      <Box
        w="full"
        p={4}
        bgColor="white"
        borderRadius="6px"
        border="1px"
        borderColor="gray.200"
      >
        <Flex
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bgColor="white"
          borderRadius="6px"
        >
          <HStack>
            <Link href={`/userview/${post.user?.uuid}`} passHref>
              <Avatar
                src={post.user?.avatar ?? "/images/default-user.png"}
                size="sm"
                cursor="pointer"
              />
            </Link>
            <Box>
              <Link href={`/userview/${post.user?.uuid}`} passHref>
                <Text
                  fontSize="13px"
                  textTransform="capitalize"
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {post.user?.firstName ?? ""}{" "}
                  {post.user?.lastName ?? "username"}
                </Text>
              </Link>
              <Text fontSize="11px" color="GrayText">
                {post.lastUpdated}
              </Text>
            </Box>
          </HStack>
          {/* <Box>
            <ReactStars
              count={5}
              size={12}
              value={Math.random() * 5}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
          </Box> */}
        </Flex>

        <Text fontSize="13px" my={4}>
          <ReactReadMoreReadLess
            charLimit={200}
            readMoreText={"see more"}
            readLessText={"see less"}
            readMoreStyle={{ color: "#553CFB", cursor: "pointer" }}
            readLessStyle={{ color: "#553CFB", cursor: "pointer" }}
          >
            {post.content}
          </ReactReadMoreReadLess>
        </Text>

        <VStack direction={{ base: "column", lg: "row" }} spacing={4}>
          {post.picture && (
            <Center w="full">
              <ImageBox imageUrl={post.picture} />
            </Center>
          )}
          {post.video && (
            <Center w="full">
              <VideoBox videoUrl={post.video} />
            </Center>
          )}
        </VStack>
        {/* <Center mt={4}>
          {extendView && (
            <BiChevronUp
              fontSize={24}
              color="darkgray"
              cursor="pointer"
              onClick={() => setExtendView(!extendView)}
            />
          )}
          {!extendView && (
            <BiChevronDown
              fontSize={24}
              color="darkgray"
              cursor="pointer"
              onClick={() => setExtendView(!extendView)}
            />
          )}
        </Center> */}
        {extendView && (
          <Box w="full">
            <Textarea
              fontSize="13px"
              minHeight="36px"
              _focus={{ outline: "none" }}
              placeholder="Add comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {comment && (
              <Button h="32px" _focus={{ outline: "none" }} my={2}>
                Post
              </Button>
            )}
            {post.comments?.map((item, index) => (
              <HStack key={index} align="start" spacing={2} mt={4}>
                <Avatar src={item.commentUser.avatar} size="xs" />
                <Box>
                  <Text fontSize={13} textTransform="capitalize">
                    {item.commentUser.firstName} {item.commentUser.lastName}
                  </Text>
                  <Text fontSize={12} color="GrayText" mt={2}>
                    {item.text}
                  </Text>
                </Box>
              </HStack>
            ))}
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default PostCard;
