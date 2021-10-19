import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";
import {
  fetchCountries,
  fetchRegions,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages,
  fetchUniversities,
  fetchProfessions,
} from "rdx/slices/location";
import { fetchMe, fetchUser } from "rdx/slices/user";
import {
  fetchPosts,
  fetchRecentVillages,
  fetchRecentUsers,
} from "rdx/slices/feedPage";
import {
  fetchVillageUsers,
  fetchVillageGraduates,
  fetchVillageArticles,
  fetchVillagePersonalities,
  fetchVillageInstitutions,
  fetchVillageVideos,
} from "rdx/slices/villagePage";
import { fetchGraduatePage } from "rdx/slices/graduatePage";

const useFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const {
    jwt,
    me: authMe,
    status: authStatus,
    error: authError,
  } = useSelector((state: OurStore) => state.authReducer);
  const {
    me,
    meStep,
    status: meStatus,
    meError,
    postError,
    user,
    userError,
  } = useSelector((state: OurStore) => state.userReducer);

  const {
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
  } = useSelector((state: OurStore) => state.locationReducer);

  const { posts, recentVillages, recentUsers } = useSelector(
    (state: OurStore) => state.feedPageReducer
  );

  const { villageUsers, villageGraduates, villageArticles, villagePersonalities, villageInstitutions, villageVideos } =
    useSelector((state: OurStore) => state.villagePageReducer);

  const { totalGraduates } = useSelector(
    (state: OurStore) => state.graduatePageReducer.pageData
  );

  const fetchCountriesData = async () => {
    await dispatch(fetchCountries());
  };
  const fetchRegionsData = async (params) => {
    await dispatch(fetchRegions(params));
  };
  const fetchDistrictsData = async (params) => {
    await dispatch(fetchDistricts(params));
  };
  const fetchSubDistrictsData = async (params) => {
    await dispatch(fetchSubDistricts(params));
  };
  const fetchVillagesData = async (params) => {
    await dispatch(fetchVillages(params));
  };
  const fetchUniversitiesData = async () => {
    await dispatch(fetchUniversities());
  };
  const fetchProfessionsData = async () => {
    await dispatch(fetchProfessions());
  };

  const fetchFeedPageData = async () => {
    await dispatch(fetchPosts());
    await dispatch(fetchRecentVillages());
    await dispatch(fetchRecentUsers());
  };
  const fetchVillagePageData = async (params) => {
    await dispatch(fetchVillageUsers(params));
    await dispatch(fetchVillageGraduates(params));
    await dispatch(fetchVillageArticles(params));
    await dispatch(fetchVillagePersonalities(params));
    await dispatch(fetchVillageInstitutions(params));
    await dispatch(fetchVillageVideos(params));
  };
  const fetchGraduatePageData = async (params) => {
    await dispatch(fetchGraduatePage(params));
  };

  const fetchCommonData = () => {
    fetchCountriesData();
    fetchVillagesData(null);
    fetchUniversitiesData();
    fetchProfessionsData();
  };

  const fetchMeData = async () => {
    await dispatch(fetchMe());
  };

  const fetchUserData = async (params) => {
    await dispatch(fetchUser(params));
  };

  return {
    jwt,
    authMe,
    authStatus,
    authError,
    me,
    meStep,
    meStatus,
    meError,
    postError,
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,    
    posts,
    recentVillages,
    recentUsers,
    totalGraduates,
    user,
    userError,
    villageUsers,
    villageGraduates,
    villageArticles,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
    fetchCountriesData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchCommonData,
    fetchMeData,
    fetchFeedPageData,
    fetchVillagePageData,
    fetchGraduatePageData,
    fetchUserData,
  };
};

export default useFetchData;
