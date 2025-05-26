import type { LoginType, ProductType } from './schemas';
import type { UserType } from './types';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function apiFactory() {
  return {
    // Auth
    login,

    // Products
    getProducts,
    getProduct,
    newProduct,
    editProduct,
    deleteProduct,
    deleteMultipleProducts,

    // Users
    getUsers,
    getUser,
    editUser,
    deleteUser,
    deleteMultipleUsers,

    // Dashboard
    getDashboardData,

    // Orders
    getOrders,
    deleteMultipleOrders,
    deleteOrder,
  };
}

//////////////////////////// PRODUCTS

function checkApiResponse(response: Response) {
  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 402 ||
    response.status === 403 ||
    response.status === 404 ||
    response.status === 500
  ) {
    return {
      error:
        response.statusText ||
        'Something went wrong, reload the page and try again',
    };
  }
  return response.json();
}

async function login({ userData }: { userData: LoginType }) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return checkApiResponse(response);
}

async function getProducts(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  return checkApiResponse(response);
}

async function getProduct({
  productId,
  token,
}: {
  productId: string;
  token: string;
}) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/admin/product/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
    }
  );
  return checkApiResponse(response);
}

async function newProduct(productData: ProductType, token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  return checkApiResponse(response);
}

async function editProduct({
  productData,
  productId,
  token,
}: {
  productData: ProductType;
  productId: string;
  token: string;
}) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/admin/product/${productId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }
  );
  return checkApiResponse(response);
}

type DeleteProductType = {
  productId: string;
  token: string;
};
async function deleteProduct({ productId, token }: DeleteProductType) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/admin/product/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
    }
  );

  return checkApiResponse(response);
}

type DeleteMultipleProductType = {
  productIds: string[];
  token: string;
};
export async function deleteMultipleProducts({
  productIds,
  token,
}: DeleteMultipleProductType) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/products`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
    body: JSON.stringify({ productIds }),
  });

  return checkApiResponse(response);
}

//////////////////////////// USERS
async function getUsers(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  return checkApiResponse(response);
}

async function getUser({ userId, token }: { userId: string; token: string }) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });

  return checkApiResponse(response);
}
type EditUserType = {
  userData: Omit<UserType, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'email'>;
  userId: string;
  token: string;
};
async function editUser({ userData, userId, token }: EditUserType) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return checkApiResponse(response);
}

async function deleteUser({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  return checkApiResponse(response);
}
export async function deleteMultipleUsers({
  userIds,
  token,
}: {
  userIds: string[];
  token: string;
}) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
    body: JSON.stringify({ userIds }),
  });
  return checkApiResponse(response);
}

////////STATS
async function getDashboardData(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  return checkApiResponse(response);
}
export async function getMonthlyIncomeStats(token: string) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/admin/users/monthly-income-stats`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
    }
  );
  return checkApiResponse(response);
}

// ORDERS
async function getOrders(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  return checkApiResponse(response);
}

type DeteleOrderType = {
  orderId: string;
  token: string;
};

async function deleteOrder({ orderId, token }: DeteleOrderType) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/admin/order/${orderId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
    }
  );

  return checkApiResponse(response);
}

type DeleteMultipleOrdersType = {
  orderIds: string[];
  token: string;
};
export async function deleteMultipleOrders({
  orderIds,
  token,
}: DeleteMultipleOrdersType) {
  const response = await fetch(`${BACKEND_BASE_URL}/api/admin/orders`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderIds }),
  });

  return checkApiResponse(response);
}
