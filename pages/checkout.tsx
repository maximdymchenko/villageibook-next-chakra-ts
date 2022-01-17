import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import {
  Container,
  Box,
  Text,
  VStack,
  Button,
  Center,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import HeaderForGuide from "components/HeaderForGuide";
import Footer from "components/Footer";
import { fetchPostJSON } from './libs/api-helpers';
import getStripe from './libs/get-stripejs';
import ReactPayPal from 'components/Paypal';

const Checkout: NextPage = () => {
  const [confirmModal, setConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paypal, setPaypal] = useState(1)
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const modal = useDisclosure();

  const paymentWithStripe = async (amount) => {
    setLoading(true)
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: amount,
    })

    console.log("checkout session = ", response)
    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }
    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    })
    setLoading(false)
  }

  return (
    <Fragment>
      <HeaderForGuide title="CHECKOUT" />
      <Container maxW="container.xl" px={6}>
        <Center w="full" mt={12}>
          <VStack
            spacing={12}
            px={24}
            py={12}
            bgColor="white"
            border="1px"
            borderRadius="8px"
            borderColor="gray.200"
          >
            <Text fontSize="32px">$29.99</Text>

            <ReactPayPal amount={29.99}/>
            
            <Button
              onClick={() => {
                paymentWithStripe(29.99)
              }}
              style={{
                width: "100%",
                backgroundColor: '#0070ba',
                padding: "10px",
                borderRadius: "5px",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Pay With Stripe
            </Button>
          </VStack>
        </Center>
      </Container>
      <Box pos="fixed" bottom={0} w="full">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Checkout;
