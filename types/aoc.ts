type AocMemberResponse = {
  stars: number;
  id: number;
  completion_day_level: {
    [day: string]: {
      [challenge: string]: AocCompletionDayLevelResponse;
    };
  };
  name: string;
  local_score: number;
  last_star_ts: number;
};

type AocCompletionDayLevelResponse = {
  "1": {
    "1": {
      star_index: number;
      get_star_ts: number;
    };
  };
};

type AocResponse = {
  members: {
    [id: string]: AocMemberResponse;
  };
};

export type Aoc = {
  members: AocMember[];
};

export type AocMember = {
  id: number;
  stars: number;
  name: string;
  score: number;
  days: {
    [day: string]: {
      [challenge: string]: {
        hasStar: boolean;
      };
    };
  };
};

const mapAocMember = (response: AocMemberResponse): AocMember => {
  return {
    id: response.id,
    stars: response.stars,
    score: response.local_score,
    name: response.name,
    days: Object.fromEntries(
      Object.entries(response.completion_day_level).map(([day, challenges]) => [
        day,
        Object.fromEntries(
          Object.entries(challenges).map(([challenge, _]) => [
            challenge,
            { hasStar: true },
          ]),
        ),
      ]),
    ),
  };
};

export const mapAocResponse = (response: AocResponse): Aoc => {
  return {
    members: Object.values(response.members)
      .map(mapAocMember)
      .sort((a, b) => b.score - a.score),
  };
};
