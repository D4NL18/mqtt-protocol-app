export const publishMessage = async (node: number, state: string, urlBase: string) => {
    if (state !== 'false' && state !== 'true') {
      throw new Error("O estado deve ser 'false' ou 'true'.");
    }

    const url = `${urlBase}/?id=${node}&state=${state}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao publicar mensagem: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error("Erro na função publishMessage:", error);
      throw error;
    }
  }


