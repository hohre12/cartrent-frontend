import {
  CREATE_NOTICE_MUTATION,
  DELETE_NOTICE_MUTATION,
  UPDATE_NOTICE_MUTATION,
} from '@/apollo/mutations/notice';
import {
  GET_LATEST_NOTICE_QUERY,
  GET_NOTICE_QUERY,
  GET_NOTICES_QUERY,
} from '@/apollo/queries/notice';
import { CreateNoticeDto, Notice, UpdateNoticeDto } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetNotices = () => {
  return useQuery<{ getNotices: Notice[] }>(GET_NOTICES_QUERY, {
    fetchPolicy: 'network-only',
  });
};

export const useGetNotice = (params: Notice['id']) => {
  return useQuery<{ getNotice: Notice }, { noticeId: Notice['id'] }>(
    GET_NOTICE_QUERY,
    {
      variables: { noticeId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
  );
};

export const useGetLatestNotice = () => {
  return useQuery<{ getLatestNotice: Notice }>(GET_LATEST_NOTICE_QUERY, {
    fetchPolicy: 'network-only',
  });
};

export const useCreateNotice = () => {
  const [createNoticeMutate] = useMutation(CREATE_NOTICE_MUTATION, {
    refetchQueries: [GET_NOTICES_QUERY, GET_NOTICE_QUERY],
  });

  const createNotice = async (params: CreateNoticeDto) => {
    if (!params) return;
    return createNoticeMutate({
      variables: { createNoticeDto: params },
    });
  };
  return { createNotice };
};

export const useUpdateNotice = () => {
  const [updateNoticeMutate] = useMutation(UPDATE_NOTICE_MUTATION, {
    refetchQueries: [GET_NOTICES_QUERY, GET_NOTICE_QUERY],
  });

  const updateNotice = async (params: UpdateNoticeDto) => {
    if (!params) return;
    return updateNoticeMutate({
      variables: { updateNoticeDto: params },
    });
  };
  return { updateNotice };
};

export const useDeleteNotice = () => {
  const [deleteNoticeMutate] = useMutation(DELETE_NOTICE_MUTATION, {
    refetchQueries: [GET_NOTICES_QUERY],
  });

  const deleteNotice = async (params: { noticeId: Notice['id'] }) => {
    if (!params) return;
    return deleteNoticeMutate({
      variables: {
        noticeId: params.noticeId,
      },
    });
  };
  return { deleteNotice };
};
