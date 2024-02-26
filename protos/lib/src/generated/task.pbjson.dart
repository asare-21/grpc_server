//
//  Generated code. Do not modify.
//  source: task.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use taskModelDescriptor instead')
const TaskModel$json = {
  '1': 'TaskModel',
  '2': [
    {'1': 'title', '3': 1, '4': 1, '5': 9, '10': 'title'},
    {'1': 'is_done', '3': 2, '4': 1, '5': 8, '10': 'isDone'},
  ],
};

/// Descriptor for `TaskModel`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List taskModelDescriptor = $convert.base64Decode(
    'CglUYXNrTW9kZWwSFAoFdGl0bGUYASABKAlSBXRpdGxlEhcKB2lzX2RvbmUYAiABKAhSBmlzRG'
    '9uZQ==');

@$core.Deprecated('Use userDescriptor instead')
const User$json = {
  '1': 'User',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `User`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userDescriptor = $convert.base64Decode(
    'CgRVc2VyEg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use taskParentModelDescriptor instead')
const TaskParentModel$json = {
  '1': 'TaskParentModel',
  '2': [
    {'1': 'title', '3': 1, '4': 1, '5': 9, '10': 'title'},
    {'1': 'subtitle', '3': 2, '4': 1, '5': 9, '10': 'subtitle'},
    {'1': 'description', '3': 3, '4': 1, '5': 9, '10': 'description'},
    {'1': 'tasks', '3': 4, '4': 3, '5': 11, '6': '.TaskModel', '10': 'tasks'},
    {'1': 'date', '3': 5, '4': 1, '5': 9, '10': 'date'},
    {'1': 'time', '3': 6, '4': 1, '5': 9, '10': 'time'},
  ],
};

/// Descriptor for `TaskParentModel`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List taskParentModelDescriptor = $convert.base64Decode(
    'Cg9UYXNrUGFyZW50TW9kZWwSFAoFdGl0bGUYASABKAlSBXRpdGxlEhoKCHN1YnRpdGxlGAIgAS'
    'gJUghzdWJ0aXRsZRIgCgtkZXNjcmlwdGlvbhgDIAEoCVILZGVzY3JpcHRpb24SIAoFdGFza3MY'
    'BCADKAsyCi5UYXNrTW9kZWxSBXRhc2tzEhIKBGRhdGUYBSABKAlSBGRhdGUSEgoEdGltZRgGIA'
    'EoCVIEdGltZQ==');

@$core.Deprecated('Use helloRequestDescriptor instead')
const HelloRequest$json = {
  '1': 'HelloRequest',
  '2': [
    {'1': 'name', '3': 1, '4': 1, '5': 9, '10': 'name'},
  ],
};

/// Descriptor for `HelloRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List helloRequestDescriptor = $convert.base64Decode(
    'CgxIZWxsb1JlcXVlc3QSEgoEbmFtZRgBIAEoCVIEbmFtZQ==');

@$core.Deprecated('Use helloReplyDescriptor instead')
const HelloReply$json = {
  '1': 'HelloReply',
  '2': [
    {'1': 'message', '3': 1, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `HelloReply`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List helloReplyDescriptor = $convert.base64Decode(
    'CgpIZWxsb1JlcGx5EhgKB21lc3NhZ2UYASABKAlSB21lc3NhZ2U=');

