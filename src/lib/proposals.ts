export const fetchAllProposals = async (daoName: string) => {
  try {
    const response = await fetch(`/api/proposals?daoName=${daoName}`);
    if (!response.ok) {
      throw Error(`HTTP status error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('responseOK', data);

    return data.data;
  } catch (error) {
    console.error('---> Error fetching proposals:', error);
    throw error;
  }
};
