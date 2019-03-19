// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import type { CommunityInfoType } from 'shared/graphql/fragments/community/communityInfo';
import type { CommunityMetaDataType } from 'shared/graphql/fragments/community/communityMetaData';
import renderTextWithLinks from 'src/helpers/render-text-with-markdown-links';
import addProtocolToString from 'shared/normalize-url';
import Icon from 'src/components/icons';
import {
  MetaContainer,
  Name,
  Description,
  MetaLinksContainer,
  MetaRow,
  OnlineDot,
} from '../style';

type Props = {
  community: {
    ...$Exact<CommunityInfoType>,
    ...$Exact<CommunityMetaDataType>,
  },
};

export const CommunityMeta = (props: Props) => {
  const { community } = props;
  const { description, website, metaData } = community;
  const { members, onlineMembers } = metaData;
  const formattedDescription = description && renderTextWithLinks(description);
  const formattedWebsite = website && addProtocolToString(website);

  return (
    <MetaContainer>
      <Link to={`/${community.slug}`}>
        <Name>{community.name}</Name>
      </Link>

      {formattedDescription && (
        <Description>{formattedDescription}</Description>
      )}

      <MetaLinksContainer>
        {formattedWebsite && (
          <MetaRow>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={formattedWebsite}
            >
              <Icon glyph={'link'} size={20} /> {website}
            </a>
          </MetaRow>
        )}

        <MetaRow>
          <Icon glyph={'person'} size={20} /> {members.toLocaleString()} members
        </MetaRow>

        <MetaRow>
          <OnlineDot /> {onlineMembers.toLocaleString()} members online
        </MetaRow>
      </MetaLinksContainer>
    </MetaContainer>
  );
};
