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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';

import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Personality, Village } from 'types/schema';

const PersonalityForm: React.FC<{
    type: string,
    village: Village,
    personality?: Personality
}> = ({
    type,
    village,
    personality
}) => {
        const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

        const [name, setName] = useState(personality?.name);
        const [avatar, setAvatar] = useState(null);
        const [photo, setPhoto] = useState(personality?.photo);
        const [about, setAbout] = useState(personality?.about);
        const [dateOfBirth, setDateOfBirth] = useState(personality?.dateOfBirth);
        const [dateOfDeath, setDateOfDeath] = useState(personality?.dateOfDeath);
        const [educationLife, setEducationLife] = useState(personality?.educationLife);
        const [achievements, setAchievements] = useState(personality?.achievements);
        const [career, setCareer] = useState(personality?.career);

        const { submitPersonalityData } = useAdminActionDispatch();

        const validationSchema = yup.object({
            name: yup.string().nullable().required("Name is required."),
            about: yup.string().nullable(),
            photoName: yup.string().nullable(),
            photoDescription: yup.string().nullable(),
            dateOfBirth: yup.date().nullable(),
            dateOfDeath: yup.date().nullable(),
            educationLife: yup.string().nullable(),
            achievements: yup.string().nullable(),
            career: yup.string().nullable(),
        });

        return (
            <Formik
                initialValues={{
                    name: name,
                    about: about,
                    photoName: photo?.name,
                    photoDescription: photo?.description,
                    dateOfBirth: dateOfBirth,
                    dateOfDeath: dateOfDeath,
                    educationLife: educationLife,
                    achievements: achievements,
                    career: career
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    // console.log({ values, actions });
                    const params = {
                        villageUuid: village.uuid,
                        name,
                        about,
                        photo: { avatar, name: photo.name, description: photo.description },
                        dateOfBirth,
                        dateOfDeath,
                        educationLife,
                        achievements,
                        career,
                    };

                    actions.setSubmitting(true);
                    await submitPersonalityData(params);
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
                                isRequired={true}
                                isInvalid={!!errors.name}
                                error={errors.name}
                            />
                            <InputBox
                                id="about"
                                label="About"
                                value={about ?? ""}
                                onChange={(e) => setAbout(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.about}
                                error={errors.about}
                            />
                            <Box w="full" border="1px" borderColor="gray.200" borderRadius="4px" p={4}>
                                <Center>
                                    <AvatarUpload setAvatar={setAvatar} />
                                </Center>
                                <InputBox
                                    id="photoName"
                                    label="Photo Name"
                                    value={photo?.name ?? ""}
                                    onChange={(e) => setPhoto({ ...photo, name: e.target.value })}
                                    isRequired={false}
                                    isInvalid={!!errors.photoName}
                                    error={errors.photoName}
                                />
                                <InputBox
                                    id="hasPhotoDescription"
                                    label="Photo Description"
                                    value={photo?.description ?? ""}
                                    onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
                                    isRequired={false}
                                    isInvalid={!!errors.photoDescription}
                                    error={errors.photoDescription}
                                />
                            </Box>
                            <InputBox
                                id="dateOfBirth"
                                label="Date Of Birth"
                                placeholder="1990-04-20"
                                value={dateOfBirth ?? ""}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.dateOfBirth}
                                error={errors.dateOfBirth}
                            />
                            <InputBox
                                id="dateOfDeath"
                                label="Date Of Death"
                                placeholder="1990-04-20"
                                value={dateOfDeath ?? ""}
                                onChange={(e) => setDateOfDeath(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.dateOfDeath}
                                error={errors.dateOfDeath}
                            />
                            <InputBox
                                id="educationLife"
                                label="Education Life"
                                value={educationLife ?? ""}
                                onChange={(e) => setEducationLife(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.educationLife}
                                error={errors.educationLife}
                            />
                            <InputBox
                                id="achievements"
                                label="achievements"
                                value={achievements ?? ""}
                                onChange={(e) => setAchievements(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.achievements}
                                error={errors.achievements}
                            />
                            <InputBox
                                id="career"
                                label="Career"
                                value={career ?? ""}
                                onChange={(e) => setCareer(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.career}
                                error={errors.career}
                            />

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

export default PersonalityForm;