<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pubic_id' => fake()->uuid(),
            'dept_id' => fake()->unique()->safeEmail(),
            'emp_class' => fake()->randomElement(['Agency', 'Bioseed']),
        ];
    }
    public function withDetails()
    {
        return $this->has(EmployeeDetailFactory::factory(), 'emp_details_id');
    }

    public function configure()
{
    return $this->afterCreating(function ($employee) {
        $employee->detail()->create(
            EmployeeDetailFactory::factory()->make()->toArray()
        );
    });
}
}
