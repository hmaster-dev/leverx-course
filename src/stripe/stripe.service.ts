import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export default class StripeService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private configService: ConfigService,
  ) {}

  public async createCustomer(name: string, email: string) {
    return await this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return await this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      currency: this.configService.get('stripe_currency'),
    });
  }
}
