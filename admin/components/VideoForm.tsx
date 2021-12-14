import { useState, useEffect } from 'react';
import {
    Container,
    Stack,
    HStack,
    VStack,
    Divider,
    Flex,
    Center,
    Box,
    Text,
    Button,
    useBreakpointValue,
    useToast
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';

import useAdminFetchData from 'hooks/use-admin-fetch-data';
import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Video, Village } from 'types/schema';

const VideoForm: React.FC<{
    type: string,
    village: Village,
    video?: Video
}> = ({
    type,
    village,
    video
}) => {
        const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
        const toast = useToast();

        const [name, setName] = useState(video?.name);                
        const [description, setDescription] = useState(video?.description);
        const [avatar, setAvatar] = useState(null);
        const [videoUrl, setVideoUrl] = useState(video?.url);

        const { error } = useAdminFetchData();
        const { submitVideoData } = useAdminActionDispatch();

        if (error) {
            !toast.isActive("videoError") &&
                toast({
                    id: "videoError",
                    title: "Failed! Try again.",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
        }

        const validationSchema = yup.object({
            name: yup.string().nullable(),
            description: yup.string().nullable(),
        });

        return (
            <Formik
                initialValues={{
                    name: name,
                    description: description,                    
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    // console.log({ values, actions });
                    const params = {
                        villageUuid: village.uuid,                        
                        video: { avatar, name, description },
                    };

                    actions.setSubmitting(true);
                    await submitVideoData(params);
                    actions.setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form noValidate>
                        <VStack spacing={4}>
                            <InputBox
                                id="name"
                                label="Name"
                                value={name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.name}
                                error={errors.name}
                            />
                            <InputBox
                                id="description"
                                label="Description"
                                value={description ?? ""}
                                onChange={(e) => setDescription(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.description}
                                error={errors.description}
                            />
                            <Box w="full" border="1px" borderColor="gray.200" borderRadius="4px" p={4}>
                                <Center>
                                    <AvatarUpload setAvatar={setAvatar} />
                                </Center>                                
                            </Box>
                        </VStack>
                        <Center mt={10}>
                            <Button
                                type="submit"
                                w="50%"
                                bgColor="purpleTone"
                                fontSize="12px"
                                fontWeight="400"
                                color="white"
                                _focus={{ boxShadow: "none" }}
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                SAVE
                            </Button>
                        </Center>
                    </Form>
                )}
            </Formik>
        )
    }

export default VideoForm;